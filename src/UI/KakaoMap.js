import { useRef,useEffect,useState } from "react";
const {kakao} = window;


const Kakaomap = ({place,placename,searchinput,onSearch}) =>{
    const [isLoading, setIsLoading] = useState(false);
    const [alert,setAlert] = useState("");
    const [timer,setTimer] = useState(0);
    const infowindow = new kakao.maps.InfoWindow({zIndex:1}); //장소명 나타내는 인포윈도우
    const ps = new kakao.maps.services.Places(); //장소 검색 객체
    const container = useRef();
    
    useEffect(()=>{
        //맵 띄우기
        //place가 null(검색모드)면 기본 좌표(강남역)으로 지정하고, null이 아니면 해당 값으로 pos 세팅
        const pos =  (place==null) ? new kakao.maps.LatLng(37.49798640766797,127.02764966969421) : new kakao.maps.LatLng(place.Lat,place.Lng);
        const options = {
            center: pos,
            level: 6
        }
        const map = new kakao.maps.Map(container.current, options);
   
        const placesSearchCB = (data, status, pagination) =>{
            if (status === kakao.maps.services.Status.OK) {
                console.log('data:'+ data);
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                let bounds = new kakao.maps.LatLngBounds();
        
                for (let i=0; i<data.length; i++) {
                    displayMarker(data[i]);    
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }       
        
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                map.setBounds(bounds);
                setAlert(null);
                setIsLoading(false);
            }
            else if (status === kakao.maps.services.Status.ZERO_RESULT) {
                setAlert(<p>검색 결과가 존재하지 않습니다.</p>);
                setIsLoading(false);
            
                return;
              } 
            else if (status === kakao.maps.services.Status.ERROR) {
                setAlert(<p>검색 결과 중 오류가 발생했습니다.</p>);
                setIsLoading(false);
                return;
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
        

        if(place!=null){ //주소 있을 때 (디스플레이 모드)

        const marker = new kakao.maps.Marker({position: pos});
        marker.setMap(map);
        kakao.maps.event.addListener(marker, 'click', function() {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + placename + '</div>');
            infowindow.open(map, marker);
        });

        }

        else if(searchinput.toString().trim().length>0){ //주소 없을 때 (검색 모드)
            if(timer){
                clearTimeout(timer);
            }
            // else if(searchinput.toString().trim()==""){
            //     setAlert(null);
            //     setIsLoading(false);
            //     console.log("hey");
            //     return;
            // }
            const newTimer = setTimeout(async ()=>{
                
                try{
                setIsLoading(true);
                setAlert(<p>로딩중입니다...</p>);
                await ps.keywordSearch(searchinput, placesSearchCB);
                }
                catch(e){
                    console.log("error",e);
                }
            },1000);
            setTimer(newTimer);

        }
        else return;
    },[place,searchinput])

    return <>{isLoading && alert}<div style={{width:'100%',height:'15rem'}} ref={container}></div></>;
}

export default Kakaomap;

