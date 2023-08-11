import { useRef,useEffect } from "react";
const {kakao} = window;
const Kakaomap = ({place}) =>{

    const placeList = {
        '강남':[37.49798640766797,127.02764966969421]
    };
    const container = useRef();

    useEffect(()=>{
        const pos =  new kakao.maps.LatLng(placeList[place][0],placeList[place][1]);
        const options = {
            // center: new kakao.maps.LatLng(placeList['강남']),
            center: pos,
            level: 6
        }
        const marker = new kakao.maps.Marker({
            position: pos
        });
        
        const map = new kakao.maps.Map(container.current, options);
        marker.setMap(map);
    },[])

    return <div style={{width:'100%',height:'15rem'}} ref={container}></div>;
}

export default Kakaomap;

