<script>
// @ts-nocheck

    import AddReview from "$lib/components/AddReview.svelte";
    import { supabase } from "$lib/supabaseClient";
    import { onMount } from "svelte/internal";
    import { page } from "$app/stores";
    import { user } from "../../UserStore";
    import { Card, CardBody } from 'sveltestrap';
    import { addReview } from "$lib/api/clientFunctions";
    import { deleteReview,editReview } from "$lib/api/csFunctions";
    import { fade } from "svelte/transition";
    import { goto } from "$app/navigation";

    let courseID = $page.params.courseID
    let reviewList = [];
    let reviewText = '';
    let reviewRating = 0;
    let courseTitle = '';
    let editReviewid

    const handleReview = async () => {
      const {data, error} = await supabase
      .from('reviews')
      .insert({ review_text: reviewText, rating: reviewRating, course_id:courseID, user_id: $user.id})
      .select()

      if (error) {console.log(error)}
      else {"data", console.log(data)}

      reviewList = [{review_id: data[0].review_id, course_id: data[0].course_id, review_text: reviewText, rating: reviewRating, created_at: data[0].created_at ,deleted:data[0].deleted, user_id:data[0].user_id}, ...reviewList]
    }

    const handleDelete = async (review_id)=>{
      let {data, error} = await deleteReview(review_id)
      if (error) {console.log(error)}
      else {console.log(data)}
      reviewList = reviewList.filter((review) => review.review_id !== review_id)
    }

    const handleEdit = async (review_id)=>{
      let {data, error} = await editReview(review_id, reviewText, reviewRating)
      if (error) {console.log(error)}
      else {console.log(data)}
      //replace review with edited review by matching review_id
      let editedReview = reviewList.filter((review) => review.review_id === review_id)
      editedReview[0].review_text = data[0].review_text
      editedReview[0].rating = data[0].rating

      console.log(editedReview)

      reviewList = reviewList.filter((review) => review.review_id !== review_id)
      reviewList = [editedReview[0], ...reviewList]
      editReviewid = null
    }

    const openEditModal = async (review_id) =>{
      //fetch review from review list and populate modal with review text and rating
      let review = reviewList.filter((review) => review.review_id === review_id)
      console.log(review)
      reviewText = review[0].review_text
      reviewRating = review[0].rating
      editReviewid = review_id
    }

    onMount(async () => {
        const { data, error } = await supabase
        .from('reviews')
        .select()
        .eq('course_id', courseID)

        if (error) {console.log(error)}
        else {reviewList = data}

        const { data:courseData, error:courseError } = await supabase
        .from('courses')
        .select('course_title')
        .eq('course_id', courseID)

        if (error) {console.log(error)}
        else {courseTitle = courseData[0].course_title};

    })
</script>

{#if courseTitle}
<div class="container-md" id="content" in:fade>

  <div class="container d-flex">
    <div class="col d-flex justify-content-center align-items-center">
      <i class="bi bi-arrow-left mx-4" id="back-button" on:click={()=>{goto('/reviews')}}></i>
      <h2 style="padding-top: 8px;"> {courseTitle}</h2>
    </div>
    {#if $user}
    <div class="col-2">
      <button class="btn btn-primary" style="margin-top: 12px;" data-bs-toggle="modal" data-bs-target="#addReviewModal" id="add-review-button">Add Review</button>
    </div>
    {/if}
    
    
  </div>

  <hr>

  

<ul class="list-group">
            
  {#each reviewList as review (review.review_id)}
      <!-- check if review.deleted === false then print -->
      {#if !review.deleted}
      <li class="list-group-item">

          <div class="card">
              <div class="card-body">
                  <p class="card-text">{review.review_text}</p>
                  <div class="d-flex justify-content-between align-items-center">
                      <small class="text-muted">{new Date(review.created_at).toLocaleString()}</small>
                      <span class="badge bg-primary">{review.rating}/10</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                      {#if $user && $user.id === review.user_id}
                      <button type="button" class="edit-button" data-bs-toggle="modal" data-bs-target="#EditReviewModal" id="edit-review-button" on:click={openEditModal(review.review_id)}>Edit</button>
                      <button type="button" class="ecancel-button" on:click={handleDelete(review.review_id)}>Delete</button>
                      {/if}
                  </div>
              </div>
          </div>
          
      </li>
      {/if}
  {/each}

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
              <button type="button" class="btn btn-secondary" id="closeButton" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" id="submitReviewButton" data-bs-dismiss="modal" on:click={handleReview}>Submit Review</button>
          </div>
      </div>
  </div>
</div>

<!-- Edit Review Modal -->
<div class="modal fade" id="EditReviewModal" tabindex="-1" aria-labelledby="addReviewModalLabel" aria-hidden="true">
  <div class="modal-dialog">
      <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title" id="addReviewModalLabel">Edit Review</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
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
              <button type="button" class="btn btn-secondary" id="closeButton" data-bs-dismiss="modal" on:click={()=>{editReviewid=null}}>Close</button>
              <button type="button" class="btn btn-primary" id="submitReviewButton" data-bs-dismiss="modal" on:click={handleEdit(editReviewid)}>Edit Review</button>
          </div>
      </div>
  </div>
</div>

</div>
{/if}


<style>

  #content {
        max-width: 800px;
        margin: auto;
        margin-top: 40px;
        border: 0px solid #000000;
        border-radius: 40px;
        background-color: var(--primary);
        background-color: var(--tertiary);
        padding: 40px;
        box-shadow: 0px 0.5rem 1rem rgba(0, 0, 0, 0.2);
    }

    #add-review-button, #submitReviewButton {
      border: var(--button-background);
      background-color: var(--button-background);
    }

    #add-review-button:hover, #submitReviewButton:hover {
      border: var(--button-hover-primary);
      background-color: var(--button-hover-primary);
    }

    #back-button {
  font-size: 2.5rem;
  color: var(--quniary);
}

#back-button:hover {
  cursor: pointer;
  color: var(--other-primary);
}

    #closeButton {
      border: var(--button-cancel);
      background-color: var(--button-cancel);
    }

    #closeButton:hover {
      border: var(--button-hover-cancel);
      background-color: var(--button-hover-cancel);
    }

    .card{
      background-color: var(--secondary);
      padding: 10px;
      border-radius: 20px;
      margin: auto;
      margin-bottom: 20px;
      box-shadow: 0px 0.5rem 1rem rgba(0, 0, 0, 0.1);
    }

    .card-body{
      padding: 10px;
    }

    .list-group-item{
      background-color: var(--primary);
      border: 0px;
    }

    .modal-header{
      background-color: var(--secondary);
      padding: 10px;
    }
    
    .modal-footer{
      background-color: var(--secondary);
      padding: 10px;
    }

    .modal-content{
      background-color: var(--secondary);
      border: 5px solid var(--other-primary);
      padding: 10px;
    }

  .form-control{
    box-shadow: 0px 0.5rem 1rem rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    border: 2px solid var(--lightblue);
    padding: 0.5rem 1rem;
    transition: all 0.2s ease-in-out;
    background-color: #fcfbf2;

  }

  .ecancel-button
    {
        font-family: 'Chau Philomene One';
        border: None;
        background-color: var(--octonary); 
        color: #ffffff;
        border-radius: 20px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        width: 32%;
        font-size: 15px;
        margin-left: 50%;
        margin-top: 3%;
        padding-top: 2%;
    }
    .ecancel-button:hover
    {
        background-color: var(--primary);
        color: var(--octonary);
        font-family: 'Chau Philomene One';
    }
    .edit-button
    {
        font-family: 'Chau Philomene One';
        border: None;
        color: #ffffff;
        background-color: var(--septanry);
        border-radius: 20px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        width: 30%;
        margin-top: 3%;
        font-size: 16px;
        margin-left: 8%;
        padding-top: 2%;
    }
    .edit-button:hover 
    {
        background-color: var(--primary);
        color: var(--quinary);
        font-family: 'Chau Philomene One';
    }
  
</style>

