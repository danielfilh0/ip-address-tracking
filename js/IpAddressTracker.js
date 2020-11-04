class IpAddressTracker {
  constructor() {
    this.inputIp = document.getElementById('ip');
    this.btnSearch = document.getElementById('btn-search');
    this.ipAddress = document.querySelector('.ip-address p');
    this.locationIp = document.querySelector('.location p');
    this.div = document.querySelector('header .container > div');
    this.timezone = document.querySelector('.timezone p');
    this.isp = document.querySelector('.isp p');
    this.click();
    this.lat = 0;
    this.long = 0;
  }
  click() {
    this.btnSearch.addEventListener('click', e => {
      e.preventDefault();
      const ip = this.inputIp.value;
      this.searchIp(ip);
    })
  }
  searchIp(ip) {
    ip = fetch(`http://ip-api.com/json/${ip}`);
    ip.then(r => r.json())
    .then(body => {
      this.ipAddress.innerText = body.query;
      this.locationIp.innerText = body.city + ', ' + body.region;
      this.timezone.innerText = body.timezone;
      this.isp.innerText = body.isp;
      this.div.classList.add("result");
      this.lat = body.lat;
      this.long = body.lon;
      this.initMap();
    });
  }
  initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: this.lat, lng: this.long },
      zoom: 8,
    });
    const marker = new google.maps.Marker( {
      position: { lat: this.lat, lng: this.long },
      map: map,
    })
  }
}