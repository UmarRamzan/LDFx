<script>
    import { supabase } from "$lib/supabaseClient";
    import { onMount } from "svelte/internal";

    let searchString = '';
    let searchResults = [];

    const getSearchResults = async (searchString) => {
        
        let { data: courses, error } = await supabase
        .from('courses')
        .select('CourseTitle, subject_code, catalog')
        .ilike('subject_code', `%${searchString}%`)

        searchResults = courses;

    }

    $: getSearchResults(searchString);
    
</script>

<p>add review</p>
<input type="text" bind:value={searchString} placeholder="search">
<input type="text" placeholder="review text">
<ul>
    {#each searchResults as result}
        <p>{result.subject_code} {result.catalog}</p>
    {/each}
</ul>