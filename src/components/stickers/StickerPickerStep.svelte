<script lang="ts">
  import { Gallery, Heading, Indicator, P } from "flowbite-svelte";
  import pumpkin from "../../lib/stickers/pumpkin.png";
  import { ShoppingBagOutline } from "flowbite-svelte-icons";

  const images = [
    { alt: "sticker 1", src: pumpkin, price: 1 },
    { alt: "sticker 2", src: pumpkin, price: 1 },
    { alt: "sticker 3", src: pumpkin, price: 1 },
    { alt: "sticker 4", src: pumpkin, price: 1 },
    { alt: "sticker 5", src: pumpkin, price: 2 },
    { alt: "sticker 6", src: pumpkin, price: 2 },
    { alt: "sticker 7", src: pumpkin, price: 3 },
    { alt: "sticker 8", src: pumpkin, price: 3 },
  ];
  let credits = 10;
  let chosenStickers = [];

  function canAffordSticker(sticker) {
    return credits >= sticker.price;
  }

  function selectSticker(sticker) {
    // alert(sticker.alt);
    if (canAffordSticker(sticker)) {
      chosenStickers = [...chosenStickers, sticker];
      credits -= sticker.price;
    }
  }

  function creditsPlural(amount) {
    return amount === 1 ? "credit" : "credits";
  }
</script>

<div class="flex flex-col gap-4">
  <div>
    <Heading tag="h5" class="text-center">Pick your stickers!</Heading>
  </div>

  <div class="flex justify-between items-center">
    <div>
      <P size="sm">Credits remaining:</P>
      <P size="lg">{credits}</P>
    </div>

    <div class="relative">
      <ShoppingBagOutline class="w-8 h-8" />
      <Indicator
        color="yellow"
        border
        size="xl"
        placement="top-right"
        class="text-xs font-bold">{chosenStickers.length}</Indicator
      >
    </div>
  </div>

  <Gallery items={images} let:item class="gap-4 grid-cols-2 md:grid-cols-3">
    <button on:click={() => selectSticker(item)}>
      <img src={item.src} alt={item.alt} class="h-auto max-w- rounded-lg" />
      <P class="text-center">{item.price} {creditsPlural(item.price)}</P>
    </button>
  </Gallery>
</div>
