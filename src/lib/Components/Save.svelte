<script lang="ts">
  async function save() {
    const tesco: string[] = JSON.parse(localStorage.getItem('tesco') as string);
    const kaufland: string[] = JSON.parse(localStorage.getItem('kaufland') as string);

    if (tesco.length > 0 || kaufland.length > 0) {
      const response = await fetch('/api/save', {
        method: 'POST',
        body: JSON.stringify({ tesco, kaufland })
      });
      const text = await response.json();
      console.log(text);
    }
  }
</script>

<div class="mb-10">
  <button
    class="text-white font-montserrat text-2xl bg-green-600 h-12 w-40 rounded-3xl shadow-2xl hover:bg-green-700 active:translate-y-1 transition"
    on:click|preventDefault={save}>Save</button
  >
</div>
