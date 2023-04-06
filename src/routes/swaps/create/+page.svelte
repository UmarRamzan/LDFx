<script>

  import { addSwapRequest, getCourses } from "$lib/api/clientFunctions";
	import { onMount } from "svelte";
  import { user } from "../../UserStore";


  let haveList = [];
  let wantList = [];
  let courseList = [];
  let searchResults = [];

  onMount(async () => {
    const {success, data, error} = await getCourses()
    if (error) {console.log(error)}
    else {courseList = data}
  })

  const addHaveCourse = () => {
    haveList = [...haveList, {course_id: "", search_string: "", section: "", selected: false}]
  }

  const addWantCourse = () => {
    wantList = [...wantList, {course_id: wantList.length, course_code: "", section: "", selected: false}]
  }

  const removeHaveCourse = (course_id) => {
    haveList = haveList.filter((course) => course.course_id != course_id)
  }

  const removeWantCourse = (course_id) => {
    wantList = wantList.filter((course) => course.course_id != course_id)
  }

  const searchCourses = (searchString) => {

    if (searchString == '') {searchResults = []; return}

    searchString = searchString.toLowerCase();
    let searchArray = searchString.split(' ')

    searchResults = courseList;
    searchArray.forEach(searchString => {
      searchResults = searchResults.filter((course) => (course.subject_code.toLowerCase().includes(searchString) || course.catalog.toLowerCase().includes(searchString) || course.course_title.toLowerCase().includes(searchString) || course.instructor.toLowerCase().includes(searchString)))
    });
    
  }

  const submitRequest = async () => {
    const {success, data, error} = await addSwapRequest($user.id, haveList, wantList)
    if (error) {console.log(error)}
  }

</script>

<div class="container-fluid mt-5">

  <div class="row justify-content-center">
    <div class="col-md-8" id="content">
      <div id="have-section">
        <div class="row mb-4">
          <div class="col">
              <h2>Have</h2>
          </div>

          <div class="col d-flex justify-content-end align-items-center">
              <button type="button" class="d-flex justify-content-center align-items-center btn btn-success" id="add-course-button" on:click={addHaveCourse}>
                <i class="bi bi-plus"></i>
              </button>
          </div>
      </div>
      
      <div class="row gy-4">
        {#each haveList as course (haveList.indexOf(course))}
        <div class="col-md-6">
          
          <div class="card px-4 pb-4">
            <div class="card-body">

              <div class="row justify-content-end">
                <button type="button" class="btn btn-outline-dark" id="remove-course-button" on:click={()=>removeHaveCourse(course.course_id)}><i class="bi bi-x-lg"></i></button>
              </div>

              <div class="row dropdown w-100">
                <label for="courseSearch">Course</label>
                <input type="text" class="form-control" id="courseSearch" placeholder="Search for course title, code, instructor" bind:value={course.search_string} on:keyup={()=>{searchCourses(course.search_string)}} on:focus={()=>{course.selected = true; searchCourses(course.search_string)}} on:focusout={()=>{setTimeout(()=>{course.selected = false}, 10)}}>

                {#if course.selected}
                <ul class="list-group dropdown-content p-0">
                  {#each searchResults as searchResult (searchResults.indexOf(searchResult))}
                  <li class="list-group-item" on:click={()=>{course.search_string = searchResult.course_title; course.selected=false}}>{searchResult.course_title + ' ' + searchResult.Section}</li>
                  {/each}
                </ul>
                {/if}

              </div>
              
            </div>
          </div>
          
        </div>
        {/each}
      </div>
      
      </div>

      <div id="separator"></div>

      <div id="want-section">
        <div class="row mb-4">
          <div class="col">
              <h2>Want</h2>
          </div>

          <div class="col d-flex justify-content-end align-items-center">
              <button type="button" class="d-flex justify-content-center align-items-center btn btn-success" id="add-course-button" on:click={addWantCourse}>
                <i class="bi bi-plus"></i>
              </button>
          </div>
      </div>
      
      <div class="row gy-4">
        {#each wantList as course (course.course_id)}
        <div class="col-md-6">
          
          <div class="card px-4 pb-4">
            <div class="card-body">

              <div class="row justify-content-end">
                <button type="button" class="btn btn-outline-dark" id="remove-course-button" on:click={()=>removeWantCourse(course.course_id)}><i class="bi bi-x-lg"></i></button>
              </div>

              <div class="row">
                <label for="courseSearch">Course</label>
                <input type="text" class="form-control mb-2" id="courseSearch" placeholder="Search for course title, code, instructor" bind:value={course.course_code}>

                <label for="courseSearch">Section</label>
                <select class="form-select" id="inputGroupSelect02" bind:value={course.section}>
                    <option selected>{course.section}</option>
                </select>
              </div>
              
              
              
            </div>
          </div>
          
        </div>
        {/each}
      </div>
      
      </div>

    </div>
    <div class="row mt-4 mb-4 justify-content-center">
      <button type="button" class="btn btn-success" id="add-course-button" on:click={submitRequest}>Create</button>
    </div>
  </div>
</div>

<style>

#content {
  border: 2px solid #000000;
  border-radius: 10px;
  background-color: var(--primary);
  padding: 20px;
  box-shadow: 0px 0.5rem 1rem rgba(0, 0, 0, 0.1);
}

.card {
  box-shadow: 0px 0.5rem 1rem rgba(0, 0, 0, 0.1);
  background-color: var(--secondary);
  width: 100%;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  border: 1px solid #ddd;
  position: absolute;
  z-index: 1;
}

.dropdown-content:hover {
  cursor: pointer;
}

.dropdown ul{
   max-height:200px;
   overflow:auto;
}


  #add-course-button {
    height: 40px;
  }

  .bi-plus {
      font-size: 30px;
  }

  #separator {
      border-bottom: 2px solid #000000;
      margin-top: 40px;
      margin-bottom: 40px;
  }

  #add-course-button {
      width: 100px;
  }

  #remove-course-button {
      width: 40px;
      height: 40px;
      border: 0px;
  }

</style>