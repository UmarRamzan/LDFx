<script lang="ts">
    import AddReview from "$lib/components/AddReview.svelte";
    import { page } from '$app/stores'; // import $page store
    import { onMount } from "svelte";
    import { getReviews } from "$lib/api/csFunctions";

    //could be null
    /**
	 * @type {{ [x: string]: any; }[] | null}
	 */
    let reviews: { [x: string]: any; }[] | null = null;

    onMount(async () => {
        let res = await getReviews($page.params.courseID);
        reviews = res.data;
    });

    let courseID = $page.params.courseID; // get courseID parameter
    console.log(courseID)
</script>
<!-- display reviews for courseID-->
<AddReview courseID={courseID} />
{#if reviews}
    {#each reviews as review}
        <div>
            <h3>{review.rating}</h3>
            <p>{review.review_text}</p>
        </div>
    {/each}
{/if}

<!--Style the reviews-->
<style>
    div {
        border: 1px solid black;
        padding: 10px;
        margin: 10px;
    }
</style>