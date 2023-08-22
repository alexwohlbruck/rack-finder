<script>
  import { A, Button, Heading, Modal, P } from "flowbite-svelte";
  export let open = false;
</script>

<Modal bind:open autoclose>
  <Heading tag="h5">About Rack Finder</Heading>
  <P>
    Rack Finder uses
    <A href="https://openstreetmap.org/" target="_blank">OpenStreetMap</A>
    data to find bicycle parking nearby you.
  </P>
  <P
    >This app is 100% free to use and open source. None of your data will be
    tracked, stored or sold, with the exception of any public contributions you
    make via your OpenStreetMap
    <A href="https://openstreetmap.org/dashboard" target="_blank">account</A>.
    These contributions are public and open source, and will be attributed to
    you licensed under the the
    <A href="https://www.openstreetmap.org/copyright" target="_blank">
      ODbL license
    </A>.
  </P>
  <P>Happy cycling! 🚲🚲</P>
  <P size="sm" align="center">
    Made with 💛 by
    <A href="https://alex.wohlbruck.com" target="_blank">Alex Wohlbruck</A>.
  </P>
</Modal>
