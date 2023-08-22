<script>
  import { Avatar, Button, Card, P } from "flowbite-svelte";
  import logo from "../lib/icons/rack-finder.svg";
</script>

<Card class="flex flex-row items-center gap-2 !p-3">
  <Avatar
    class="bg-primary-300 border-2 border-primary-400 shadow-md shadow-primary-600/40 !w-14 !h-14 p-3"
    rounded
  >
    <img src={logo} alt="Rack Finder Logo" />
  </Avatar>
</Card>
