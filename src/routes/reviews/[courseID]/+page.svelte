<script>
    import AddReview from "$lib/components/AddReview.svelte";
    import { supabase } from "$lib/supabaseClient";
    import { onMount } from "svelte/internal";
    import { page } from "$app/stores";
    import { Card, CardBody } from 'sveltestrap';
    import { addReview } from "$lib/api/accountFunctions";
    let courseID = $page.params.courseID
    let reviewList = [];
    onMount(async () => {
        const { data, error } = await supabase
        .from('reviews')
        .select()
        .eq('course_id', courseID)

      if (error) {console.log(error)}
      else {reviewList = data}
    })
</script>

<AddReview /> 

<ul class="search-results">
    {#each reviewList as review (review.review_id)}
        <Card>
            <CardBody>
                {review.rating}/10 <br> {review.review_text} <br> {review.created_at}
            </CardBody>
        </Card>
    {/each}
</ul>

<style>
    .search-results {
        margin: auto;
        width: 400px;
    }
</style>