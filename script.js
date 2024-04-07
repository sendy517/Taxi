let center = [48.38937283383738,135.12204237419905];
let festu=[48.49279003857536,135.06774579514754];
function init() {
	let map = new ymaps.Map('map-test', {
		center: center,
		zoom: 17,
        controls:['routePanelControl'],
        yandexMapDisablePoiInteractivity: true

	},{suppressMapOpenBlock: true});

    let city='Хабаровск';
    let control=map.controls.get('routePanelControl')

    // Получение мультимаршрута.
    var multiRoutePromise = control.routePanel.getRouteAsync();
    multiRoutePromise.then(function(multiRoute) {
        // Подписка на событие обновления мультимаршрута.
        multiRoute.model.events.add('requestsuccess', function() {
            // Получение ссылки на активный маршрут.
            var activeRoute = multiRoute.getActiveRoute();
            // Когда панель добавляется на карту, она
            // создает маршрут с изначально пустой геометрией. 
            // Только когда пользователь выберет начальную и конечную точки,
            // маршрут будет перестроен с непустой геометрией.
            // Поэтому для избежания ошибки нужно добавить проверку,
            // что маршрут не пустой.
            if (activeRoute) {
                // Вывод информации об активном маршруте.
                console.log("Длина: " + activeRoute.properties.get("distance").text);
                console.log("Время прохождения: " + activeRoute.properties.get("duration").text);
                //МОЖНО ВЫВОДИТЬ ИНФОРМАЦИЮ ОКНОМ!
                window.alert("Длина: " + activeRoute.properties.get("distance").text);
            }
        });
    }, function (err) {
      console.log(err); 
    });  

    

    control.routePanel.state.set({
        type: 'taxi',
        fromEnabled:false,
        from:`${city}, Серышева 47`,
        toEnabled:true,
    })

    control.routePanel.options.set({
        types:{
            taxi:true,
            masstransit:true,
            auto:true
        }
    })
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