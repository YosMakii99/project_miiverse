<style>
  #custom-cursor {
    position: absolute;
    width: 32px; /* Ajusta el tamaño según sea necesario */
    height: 32px;
    pointer-events: none; /* Para que no interfiera con los clics */
    z-index: 9999;
  }
</style>

<img id="custom-cursor" src="miiverse-cursor.png">

<script>
  const cursor = document.getElementById("custom-cursor");

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.pageX}px`;
    cursor.style.top = `${e.pageY}px`;
  });
</script>