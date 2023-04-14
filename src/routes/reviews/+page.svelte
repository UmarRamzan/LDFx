<script>
    import { supabase } from "$lib/supabaseClient";
    import { Col, Container, Row, Card, CardBody } from 'sveltestrap';
    import { onMount } from "svelte/internal";
    import { fade } from "svelte/transition";


    let courseList = [];

    let searchString = '';
    let searchResults = [];

    const getSearchResults = async () => {
        
        let { data: courses, error } = await supabase
        .from('courses')
        .select('course_id, subject_code, catalog, course_title, instructor')

        courseList = courses;
        searchResults = courses;

    }

    const searchCourses = () => {

        if (searchString == '') {searchResults = courseList; return}

        searchString = searchString.toLowerCase();
        let searchArray = searchString.split(' ')

        searchResults = courseList;
        searchArray.forEach(searchString => {
        searchResults = searchResults.filter((course) => (course.subject_code.toLowerCase().includes(searchString) || course.catalog.toLowerCase().includes(searchString) || course.course_title.toLowerCase().includes(searchString) || course.instructor.toLowerCase().includes(searchString)))
        });

    }

    onMount(()=>getSearchResults())
    
</script>

<div class="container-md content" in:fade>
<Row>
    <Col>
        <h2>Reviews</h2>
    </Col>
</Row>

<hr class="seperator">

<div class ="container">
    <form class= "d-flex justify-content-center">
        <input class = "form-control" id="search-bar" type = "search" autocomplete="off" placeholder="Search for course title, code, instructor" bind:value={searchString} on:keyup={searchCourses}>
    </form>
</div>

{#if searchResults}
<ul class="search-results">
    {#each searchResults as result (result.course_id)}
    <a href="/reviews/{result.course_id}">
    <div class="p-4 mb-2 rounded" id="search-card">
        
            {result.subject_code} {result.catalog} {result.course_title}
        
        </div> 
    </a>
    {/each}
</ul>
{/if}

</div>

<style>
    .content {
    max-width: 800px;
    margin: auto;
    margin-top: 40px;
    border: 0px solid #000000;
    border-radius: 40px;
    background-color: var(--secondary);
    padding: 20px;
    box-shadow: 0px 0.5rem 1rem rgba(0, 0, 0, 0.2);
    border: 5px solid var(--other-primary);
  }

    h2 {
        text-align: center;
    }

    .search-input {
        width:100%;
        
    }

    .hr {
        width: 80%;
    }

    #search-bar {
        margin: auto 30px;
        width: 80%;
    }

    .search-results {
        width: 80%;
        color: black;
        margin: auto;
        padding: 10px;
    }

    #search-card {
        background-color: var(--primary);
        box-shadow: 0px 0.5rem 1rem rgba(0, 0, 0, 0.1);
    }

    #search-card:hover {
        background-color: var(--quaternary);
    }

    a {
     color: black;
     text-decoration: none; /* no underline */
    }
  </style>