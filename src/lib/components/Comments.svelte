

<script>
// @ts-nocheck
    import { onMount } from "svelte";
    import { getDonationComments } from "$lib/api/csFunctions";

    export let id = '';
    let comments = ['Comment 1', 'Comment 2', 'Comment 3'];
    export let parentID = '';

    onMount(async () => {
        if (id==="comments-modal-donations"){
            let { success, data, error } = await getDonationComments(parentID);
            if (success) {
                comments = data;
                console.log(data)
            } else {
                console.log(error);
            }
        }
    });

  </script>
  
  <div class="modal fade" id={id} tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Comments</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          {#each comments as comment}
            <div class="comment">
              <p>{comment.text}</p>
            </div>
          {/each}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  