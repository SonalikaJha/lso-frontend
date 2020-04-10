export default {
  gotoTop() {
    document.getElementById('mainRouterOutlet').scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  },
  toProperCase(str) {
          return str.replace(
              /\w\S*/g,
              function(txt) {
                  return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
              }
          );
      }
}
