let center = [48.38937283383738,135.12204237419905];
let festu=[48.49279003857536,135.06774579514754];
function init() {
	let map = new ymaps.Map('map-test', {
		center: center,
		zoom: 17,
        
	});

    let placemark=new ymaps.Placemark(center,{
        balloonContent:`<div class="balloon">        
        Balloon
        </div>`
    }, {
    iconLayout: 'default#image',
    iconImageHref: 'D:/Такси/images/pin-point.png',
    
    iconImageOffset: [-10, -20],
    balloonShadow: true
    });
    
    let placemark1=new ymaps.Placemark(center,{
         
        balloonContentHeader: 'Начальная точка',
    balloonContentBody: 'ДОМ',
    balloonContentFooter: 'Хабаровск',

        }, {
        
        });
    
 
    map.geoObjects.add(placemark1)
}
ymaps.ready(init);