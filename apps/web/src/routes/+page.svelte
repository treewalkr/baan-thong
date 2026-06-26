<script lang="ts">
import Leaf from '@lucide/svelte/icons/leaf'
import { Button } from '$lib/components/ui/button'

// Svelte 5 runes — no stores, no $: , no on:click.
let count = $state(0)
let label = $derived(
  count === 0 ? 'No leaves yet' : `${count} leaf${count === 1 ? '' : 's'}`,
)
</script>

<svelte:head>
	<title>baan-thong — goldleaf online</title>
</svelte:head>

<main class="flex min-h-dvh flex-col items-center justify-center gap-6 p-8">
	<div class="flex flex-col items-center gap-3 text-center">
		<div class="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
			<Leaf class="size-8" />
		</div>
		<h1 class="text-3xl font-semibold tracking-tight">baan-thong</h1>
		<p class="text-muted-foreground">{label}</p>
	</div>

	<div class="flex items-center gap-3">
		<Button onclick={() => count++}>
			<Leaf data-icon="inline-start" />
			Add a leaf
		</Button>
		<Button variant="outline" onclick={() => (count = 0)}>Reset</Button>
	</div>
</main>
