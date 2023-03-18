<script>
    import { supabase } from "$lib/supabaseClient";
    import { Col, Container, Row, Card, CardBody } from 'sveltestrap';
    import { onMount } from "svelte/internal";

    let searchString = '';
    let searchResults = [];

    let tempResults = [];

    

    const getSearchResults = async () => {
        
        let { data: courses, error } = await supabase
        .from('courses')
        .select('course_id, subject_code, catalog, course_title')
        

        console.log(courses);

        searchResults = courses;

    }

    onMount(()=>getSearchResults())
    $: tempResults = searchResults.filter(result => result.course_title.toUpperCase().match(searchString.toUpperCase()) || result.catalog.match(searchString))
    
</script>

<Row>
    <Col>
        <h1>Reviews</h1>
    </Col>
</Row>

<input type="text" class="search-input" bind:value={searchString} placeholder="Search">
{#if tempResults}
<ul class="search-results">
    {#each tempResults as result (result.course_id)}
    <div class="shadow-sm p-3 mb-5 bg-white rounded">
        <a href="/reviews/{result.course_id}">
            {result.subject_code} {result.catalog} {result.course_title}
        </a>
        </div> 
    {/each}
</ul>
{/if}

<style>
    .search-input {
        margin: auto;
        margin-left: 100px;
    }

    .search-results {
        width: 100%;
        max-width: 400px;
        color: black;
        margin: auto;
        padding: 10px;
    }

    a {
     color: black;
     text-decoration: none; /* no underline */
    }
  </style>