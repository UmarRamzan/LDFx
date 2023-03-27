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

<!-- <AddReview /> 

<ul class="search-results">
    {#each reviewList as review (review.review_id)}
        <Card>
            <CardBody>
                {review.rating}/10 <br> {review.review_text} <br> {review.created_at}
            </CardBody>
        </Card>
    {/each}
</ul> -->

<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
    Add Review
  </button>
  
  <!-- Modal -->
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="Add Review fs-5" id="staticBackdropLabel">Add Review</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <label for="exampleFormControlInput1" class="form-label">Intrusctor Name</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Dr. BJ Novak">

            <label for="exampleFormControlTextarea1" class="form-label">Write Your Review</label>
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Post</button>
        </div>
      </div>
    </div>
  </div>


<style>
    .search-results {
        margin: auto;
        width: 400px;
    }
</style>