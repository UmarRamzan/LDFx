<script>
    import AddReview from "$lib/components/AddReview.svelte";
    import { supabase } from "$lib/supabaseClient";
    import { onMount } from "svelte/internal";
    import { page } from "$app/stores";
    import { Card, CardBody } from 'sveltestrap';
    import { addReview } from "$lib/api/accountFunctions";
    let courseID = $page.params.courseID
    let reviewList = [];

    let reviewText = '';
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
        
            <label for="exampleFormControlTextarea1" class="form-label">Write Your Review</label>
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" bind:value={reviewText}></textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" value="Done!">Post</button>
        </div>
      </div>
    </div>
  </div>
  <ul class="list-group list-group-flush">   <li class="list-group-item">Cras justo odio</li>   <li class="list-group-item">Dapibus ac facilisis in</li>   <li class="list-group-item">Morbi leo risus</li>   <li class="list-group-item">Porta ac consectetur ac</li>   <li class="list-group-item">Vestibulum at eros</li> </ul>

<style>
    .search-results {
        margin: auto;
        width: 400px;
    }
</style>