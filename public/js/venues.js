document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('city').addEventListener('change', function() {
      window.location.href = '/venues?city=' + this.value;
    });
  });
  