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

<!-- <div class="search-input">
<input type="text" bind:value={searchString} class="search-bar" placeholder="Search">
</div> -->

<div class ="container w-50">
    <form class= "d-flex">
        <input class = "form-control me-1" type = "search" placeholder="Search">
        <button class="btn btn-outline-info" type="send">Search</button>
    </form>
</div>

<!-- <div class="input-group rounded">
    <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
    <span class="input-group-text border-0" id="search-addon">
        <i class="fas fa-search"></i>
    </span>
</div> -->

{#if tempResults}
<ul class="search-results">
    {#each tempResults as result (result.course_id)}
    <div class="shadow-sm p-1 mb-2 bg-white rounded">
        <a href="/reviews/{result.course_id}">
            {result.subject_code} {result.catalog} {result.course_title}
        </a>
        </div> 
    {/each}
</ul>
{/if}

<style>
    h1 {
        text-align: center;
    }

    .search-input {
        width:100%;
        
    }

    .search-bar {
        margin-left: 500px;
        width: 400px;
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