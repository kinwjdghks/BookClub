import { useRef,useEffect } from "react";
const {kakao} = window;


const Kakaomap = ({place,placename,searchinput,onSearch}) =>{
    
    const infowindow = new kakao.maps.InfoWindow({zIndex:1}); //장소명 나타내는 인포윈도우
    const ps = new kakao.maps.services.Places(); //장소 검색 객체
    const container = useRef();
    
    useEffect(()=>{
        
        const pos =  (place==null) ? new kakao.maps.LatLng(37.49798640766797,127.02764966969421) : new kakao.maps.LatLng(place.Lat,place.Lng);
        const options = {
            center: pos,
            level: 6
        }
        const map = new kakao.maps.Map(container.current, options);

        const placesSearchCB =(data, status, pagination) =>{
            if (status === kakao.maps.services.Status.OK) {
        
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                let bounds = new kakao.maps.LatLngBounds();
        
                for (let i=0; i<data.length; i++) {
                    displayMarker(data[i]);    
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }       
        
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                map.setBounds(bounds);
            } 
        }
        
        const displayMarker = (place) => {
        
            // 마커를 생성하고 지도에 표시합니다
            let marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x) 
            });
        
            // 마커에 클릭이벤트를 등록합니다
            kakao.maps.event.addListener(marker, 'click', function() {
                // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
                infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                infowindow.open(map, marker);
                onSearch({coor:{Lat: place.y, Lng:place.x},name:place.place_name});
                
            });
        }
        

        if(place!=null){ //주소 있을 때

        const marker = new kakao.maps.Marker({position: pos});
        marker.setMap(map);
        kakao.maps.event.addListener(marker, 'click', function() {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + placename + '</div>');
            infowindow.open(map, marker);
        });

        }

        else{
            setTimeout(()=>{
                ps.keywordSearch(searchinput, placesSearchCB); 
            },1000);

        }
    },[place,searchinput])

    return <div style={{width:'100%',height:'15rem'}} ref={container}></div>;
}

export default Kakaomap;

