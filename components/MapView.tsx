import { useEffect, useRef, useState } from "react"
import { Map, MapMarker, MapTypeControl, MarkerClusterer, } from "react-kakao-maps-sdk"
import { View, Text, StyleSheet } from "react-native"
import UseKakaoLoader from "./useKakaoLoader"
import { setSourceMapRange } from "typescript"

export default function MapView() {
  UseKakaoLoader()
  const mapRef = useRef<kakao.maps.Map>(null)
  const [currentLoc, setCurrentLoc] = useState(null)
  const [error, setError] = useState(null)
  const [markerPosition, setMarkerPosition] = useState(null)
  const [markers, setMarkers] = useState([
    {
      pos: {
        lat: 36.37,
        lng: 127.36
      }
    }
  ])
  const [isVisible, setIsVisible] = useState(true)

  const lastMarker = markers.length > 0 ? markers[markers.length - 1] : null;

  return (
<View style={styles.container}>
    <Map // 지도를 표시할 Container
      center={{lat: 36.37, lng: 127.36}}
      style={{
        // 지도의 크기
        width: "100%",
        height: "75%",
      }}
      level={3} // 지도의 확대 레벨
      ref={mapRef}
      onCenterChanged={(map) => setCurrentLoc({
        center:{
          lat: map.getCenter().getLat(),
          lng: map.getCenter().getLng(),
        }
      })}
      // onClick={(_target, MouseEvent) => setMarkerPosition({
      //   lat: MouseEvent.latLng.getLat(),
      //   lng: MouseEvent.latLng.getLng(),
      // })}
      onClick={(_target, MouseEvent) => {
        let mouseLat = MouseEvent.latLng.getLat()
        let mouseLng = MouseEvent.latLng.getLng()

        setMarkers([
        ...markers,
        {
          pos: {
            lat: mouseLat,
            lng: mouseLng
          }
        },
      ])}
    }
    >
      {isVisible && 
        markers.map((marker,index) => (
          <MapMarker
            key={`${marker.pos}-${index}`}
            position={marker.pos}
            />
        )) 
      }
      {markerPosition && <MapMarker position={markerPosition} />}
    </Map>
        {/* <MapInfo mapRef={mapRef} /> */}
        {lastMarker && <ClickInfo marker={lastMarker} />}
</View>
  )
}

function ClickInfo( { marker } ) {
  let lat = marker.pos.lat;
  let lng = marker.pos.lng;
  return (
    <Text>
        Dropped marker at &lt;{lat}, {lng}&gt;
    </Text>
  )
}

function MapInfo( {mapRef}) {
  const GetInfo = () => {
    const map = mapRef.current
    if (!map) return
    const center = map.getCenter()
    // 지도의 현재 레벨을 얻어옵니다
    const level = map.getLevel()
    // 지도타입을 얻어옵니다
    const mapTypeId = map.getMapTypeId()
    // 지도의 현재 영역을 얻어옵니다
    const bounds = map.getBounds()
    // 영역의 남서쪽 좌표를 얻어옵니다
    const swLatLng = bounds.getSouthWest()
    // 영역의 북동쪽 좌표를 얻어옵니다
    const neLatLng = bounds.getNorthEast()
    // 영역정보를 문자열로 얻어옵니다. ((남,서), (북,동)) 형식입니다
    // const boundsStr = bounds.toString()
    let message = "지도 중심좌표는 위도 " + center.getLat() + ", \n"
    message += "경도 " + center.getLng() + " 이고 \n"
    message += "지도 레벨은 " + level + " 입니다 \n \n"
    message += "지도 타입은 " + mapTypeId + " 이고 \n "
    message +=
      "지도의 남서쪽 좌표는 " +
      swLatLng.getLat() +
      ", " +
      swLatLng.getLng() +
      " 이고 \n"
    message +=
      "북동쪽 좌표는 " +
      neLatLng.getLat() +
      ", " +
      neLatLng.getLng() +
      " 입니다"
    // setInfo(message)
    return message
  }

  return (
    <Text>
      {GetInfo()}
    </Text>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    borderRadius: 10,
    width: '10%',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  }

});
