let script;
let autocomplete;

window.addEventListener('DOMContentLoaded', () => {
  // addScript();
  // locator();
});

function locator() {
}

function addScript() {
}

function initMap(posit) {
  const mapId = document.getElementById("map");
  const mapOpts = {
    center: posit,
    zoom: 14,
    mapTypeControl: false,
  };
  const map = new google.maps.Map(mapId, mapOpts);
  const card = document.getElementById("pac-card");
  const input = document.getElementById("pac-input");

  map.controls[google.maps.ControlPosition.TOP_CENTER].push(card);

  autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.setFields = ['formatted_address', 'geometry', 'name', 'photos'];
  autocomplete.setTypes = ['lodging'];
  autocomplete.strictBounds = false;

  autocomplete.bindTo('bounds', map);

  const infowindow = new google.maps.InfoWindow();
  const infowindowContent = document.getElementById('infowindow-content');
  infowindow.setContent(infowindowContent);

  const marker = new google.maps.Marker({
    map,
    anchorPoint: new google.maps.Point(1, -30),
    // icon: place.photos[0].getUrl({maxWidth: 40, maxHeight: 40})
    // title: place.name,
  });

  autocomplete.addListener('place_changed', () => {
    infowindow.close();
    marker.setVisible(false);
    const place = autocomplete.getPlace();

    if (!place.geometry || !place.geometry.location) {
      window.alert("No Deets: '" + place.name + "'");
      return;
    }
    place.geometry.viewport ?
      map.fitBounds(place.geometry.viewport) :
      map.setCenter(place.geometry.location)

    function photon(pl) {
    }

    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
    infowindowContent.children['place-name'].textContent = place.name;
    infowindowContent.children['place-photos'].src = photon(place);
    if(document.getElementById('pay')) {
      infowindowContent.children['pay'].innerHTML = payUS();
    }
    infowindowContent.children['place-address'].textContent = place.formatted_address;
    infowindow.open(map, marker);
  });

  // marker.addListener  
}
