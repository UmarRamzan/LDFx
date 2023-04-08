<script>
    import AddReview from "$lib/components/AddReview.svelte";
    import { supabase } from "$lib/supabaseClient";
    import { onMount } from "svelte/internal";
    import { page } from "$app/stores";
    import { Card, CardBody } from 'sveltestrap';
    import { addReview } from "$lib/api/clientFunctions";
    let courseID = $page.params.courseID
    let reviewList = [];
    let reviewText = '';
    let reviewRating = 0;
    

    const handleReview = async () => {
      const {data, error} = await supabase
      .from('reviews')
      .insert({ review_text: reviewText, rating: reviewRating})
      .select()

      if (error) {console.log(error)}
      else {"data", console.log(data)}

      reviewList = [...reviewList, {review_id: data[0].review_id, course_id: data[0].course_id, review_text: reviewText, rating: reviewRating, created_at: data[0].created_at }]
    }



    onMount(async () => {
        const { data, error } = await supabase
        .from('reviews')
        .select()
        .eq('course_id', courseID)

      if (error) {console.log(error)}
      else {reviewList = data}

      console.log(data)
    })
</script>

<ul class="list-group">
  <li class="list-group-item">
    <div class="card">
        <div class="card-body">
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addReviewModal">Add Review</button>
        </div>
    </div>
  {#each reviewList as review (review.review_id)}
      <li class="list-group-item">
          <div class="card">
              <div class="card-body">
                  <p class="card-text">{review.review_text}</p>
                  <div class="d-flex justify-content-between align-items-center">
                      <small class="text-muted">{new Date(review.created_at).toLocaleString()}</small>
                      <span class="badge bg-primary">{review.rating}/10</span>
                  </div>
              </div>
          </div>
      </li>
  {/each}

</li>
</ul>

<!-- Add Review Modal -->
<div class="modal fade" id="addReviewModal" tabindex="-1" aria-labelledby="addReviewModalLabel" aria-hidden="true">
  <div class="modal-dialog">
      <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title" id="addReviewModalLabel">Add Review</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <!-- Add Review Form -->
              <form>
                  <div class="mb-3">
                      <label for="reviewText" class="form-label">Review Text</label>
                      <textarea class="form-control" id="reviewText" rows="3" bind:value={reviewText}></textarea>
                  </div>
                  <div class="mb-3">
                      <label for="reviewRating" class="form-label">Rating (out of 10)</label>
                      <input type="number" class="form-control" id="reviewRating" min="1" max="10" bind:value={reviewRating}>
                  </div>
              </form>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" id="submitReviewButton" data-bs-dismiss="modal" on:click={handleReview}>Submit Review</button>
          </div>
      </div>
  </div>
</div>








  
  

<style>
    .search-results {
        margin: auto;
        width: 400px;
    }

    .card{
      background-color: var(--primary)

    }
</style>