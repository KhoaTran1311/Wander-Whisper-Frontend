import {useEffect, useMemo, useRef, useState} from 'react';
import Globe from 'react-globe.gl';
import {
    MeshPhongMaterial,
    SpotLight,
    Fog,
    AmbientLight,
    Mesh,
    SphereGeometry,
    MeshBasicMaterial
} from 'three';
import countries from '../../data/globe.json';
import pointsData from '../../data/results_test.json';
import Loading from "../Loading/Loading.jsx";
import {useAppContext} from "../../context/AppContext.jsx";
import {useResultsContext} from "../../context/ResultsContext.jsx";
import stars from '../../assets/backgrounds/stars/stars_3D.json';

const min = 1000;
const max = 4000;

const GlobeComponent = ({ width, height }) => {
    const { chosenCity } = useResultsContext();
    const { location } = useAppContext();
    const globeRef = useRef(null);
    const mountedRef = useRef(false);
    const [isInitialized, setIsInitialized] = useState(false);

    const home = useMemo(() => ({
        lat: location.lat,
        lng: location.lng,
        home_color: 'rgb(255,255,255)',
    }), [location]);

    const dataPoints = useMemo(() => {
        return [...pointsData, home];
    }, [home]);

    const arcsData = useMemo(() => {
        if (!chosenCity){
            return dataPoints.map((val) => {
                const randTime = Math.floor(Math.random() * (max - min + 1) + min);
                return {
                    startLat: home.lat,
                    startLng: home.lng,
                    endLat: val.lat,
                    endLng: val.lng,
                    time: randTime,
                    color: ['#ffffff00', '#e1e5ff', 'rgba(255,0,0,0.37)'],
                };
            });
        }
        return [
            {
                startLat: home.lat,
                startLng: home.lng,
                endLat: chosenCity.lat,
                endLng: chosenCity.lng,
                time: 0,
                color: ['rgb(255,255,255)', '#e1e5ff', 'rgba(255,0,0,0.9)'],
            },
        ];
    }, [chosenCity, home]);

    const ringData = useMemo(() => {
        return chosenCity ? [chosenCity] : [];
    }, [chosenCity]);

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    }, []);

    useEffect(() => {
        if (!globeRef.current) return;
        const controls = globeRef.current.controls();

        if (!chosenCity) {
            controls.autoRotate = true;
            controls.enableZoom = false;
            globeRef.current.pointOfView(
                { lat: home.lat, lng: home.lng, altitude: 1.8 },
                1500
            );
            return;
        }
        controls.autoRotate = false;
        controls.enableZoom = true;
        globeRef.current.pointOfView(
            { lat: chosenCity.lat, lng: chosenCity.lng, altitude: 0 },
            1500
        );
    }, [chosenCity]);


    const globeReady = () => {
        setTimeout(() => {
            if (mountedRef.current && globeRef.current) {
                const controls = globeRef.current.controls();
                const camera = globeRef.current.camera()
                const scene = globeRef.current.scene()

                controls.autoRotate = true;
                controls.enableZoom = false;
                controls.minDistance = 150;
                controls.maxDistance = 200;
                controls.enablePan = false;
                controls.minPolarAngle= Math.PI / 5
                controls.maxPolarAngle= Math.PI - Math.PI / 3

                globeRef.current.pointOfView({
                    lat: home.lat,
                    lng: home.lng,
                    altitude: 1.8,
                })

                const spotLight = new SpotLight("#fdf6dc", 100, 500, Math.PI / 8, 0, 0.05)
                spotLight.position.set(-200, 200, 10)

                globeRef.current.lights([])

                camera.add(spotLight)
                camera.far = 1000
                camera.near = 0.1
                camera.fov = 75

                scene.fog = new Fog(0xffffff, 400, 2000);
                scene.add(globeRef.current.camera());
                scene.add(new AmbientLight("#38bdf8", 0.5));

                setIsInitialized(true);
            }
        }, 1000);
    };

    const ringsColorFunc = t => `rgba(255,0,0,${Math.sqrt(1-t)})`;

    return (
        <div className='relative'>
            {!isInitialized && (
                <div
                    className='loading-overlay absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-zinc-950 z-10'
                >
                    <Loading />
                </div>
            )}
            <Globe
                ref={globeRef}
                waitForGlobeReady={true}
                animateIn={false}
                onGlobeReady={globeReady}
                globeOffset={[-300,0]}
                width={width}
                height={height}
                backgroundColor={'rgb(9,9,11,0)'}
                rendererConfig={{antialias: false, alpha: false}}
                globeMaterial={
                    new MeshPhongMaterial({
                        color: '#0b1229',
                        opacity: 1,
                        transparent: false,
                        emissive: '#0b1229',
                        emissiveIntensity: 0,
                        shininess: 0.0,
                    })
                }
                ringsData={ringData}
                ringMaxRadius={5}
                ringColor={() => ringsColorFunc}
                ringPropagationSpeed={2}
                ringRepeatPeriod={300}
                pointsMerge={false}
                pointsData={dataPoints}
                pointAltitude={0.005}
                pointRadius={1.0}
                pointResolution={3}
                pointColor={(d) => {
                    if (d.home_color) {
                        return d.home_color;
                    }
                    if (chosenCity && d.city_id !== chosenCity.city_id){
                        return 'rgb(35,35,35)';
                    }
                    return 'rgb(190,0,15)';
                }}
                arcsData={arcsData}
                arcAltitudeAutoScale={0.3}
                arcColor='color'
                arcStroke={0.5}
                arcDashGap={2}
                arcDashAnimateTime='time'
                showAtmosphere={true}
                atmosphereColor={'#8ec5ff'}
                atmosphereAltitude={0.2}
                hexPolygonsData={countries.features}
                hexPolygonResolution={3}
                hexPolygonMargin={0.6}
                hexPolygonColor={() => '#00bc7d'}
                customLayerData={stars}
                customThreeObject={(obj) => {
                    const {size, color} = obj;
                    return new Mesh(new SphereGeometry(size), new MeshBasicMaterial({color}));
                }}
                customThreeObjectUpdate={(obj, sliceData) => {
                    const {lat, lng, altitude} = sliceData;
                    return Object.assign(obj.position, globeRef.current?.getCoords(lat, lng, altitude));
                }}
            />
        </div>
    );
};

export default GlobeComponent;



