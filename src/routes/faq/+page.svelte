<script>
	// @ts-nocheck
	
		let accordionItems = [
		  { title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et? ', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
		  { title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et? ', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
		  { title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et? ', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
		  { title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et? ', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
		  { title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et? ', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
		];
		function toggleAccordion(index) {
		  accordionItems = accordionItems.map((item, i) => {
			if (i == index) {
			  return {
				...item,
				isOpen: !item.isOpen
			  };
			}
			return {
			  ...item,
			  isOpen: false
			};
		  });
		}
	</script>
	
	<main>
	<body>
			<div>
				<div class = "container">
					<div class = "text-center">
						<p>Frequently Asked Questions</p>
					</div>
					<div class = "container-1">
						<hr id="hor-1" class = justify-content-lg-center/>
					</div>
				</div>
	
				<div class="accordion">
					{#each accordionItems as item, i}
					<div class="accordion-item" class:open={item.isOpen} on:click={() => toggleAccordion(i)}>
						<div class="accordion-header">
							<span>{item.title}</span>
							<img src = "images/faqimg.png" alt = "Question Mark" class = "qs-1">
							<i class="material-icons">{item.isOpen ? '⌃' : '⌄'}</i>
						</div>
						<div class="accordion-content">
							{item.content}
						</div>
					</div>
					{/each}
		
				</div>
			</div>
	</body>
	</main>
	  
	<style>
		@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;1,300&display=swap');
		@import url('https://fonts.googleapis.com/css2?family=Chau+Philomene+One:ital@0;1&display=swap');
	
		.text-center
		{
			color: var(--quinary);
			font-size: 45px;
			padding-top: 2%;
			margin-bottom: -2%;
			font-family: 'Chau Philomene One';
		}
		#hor-1
		{
			border: 3px solid var(--octonary);
			width: 30%;
			margin: 0 auto;
			margin-bottom: -8%;
		}
		.accordion {
		  max-width: 85%;
		  padding-left: 15%;
		  padding-top: 11%;
		}
		body
		{
			background-color: var(--secondary);
			overflow: auto;
			height: 100%; 
			width: 100%; 
			min-height: 100vh;
			margin: 0%;
			overflow: auto;
			padding: 0%;
		} 
		.accordion-item {
		  border-bottom: 2px solid var(--other-primary);
		  border-radius: 0%;
		  margin-bottom: 0%;
		  border-left: 2px solid var(--other-secondary); 
		  border-right: 2px solid var(--other-secondary); 
		  border-top: 2px solid var(--other-secondary); 
	
		}
		.accordion-item.open .accordion-content {
		  max-height:  100%;
		  transition: max-height 0.01s;
		  font-family: 'Chakra Petch';
		  padding-bottom: 2%;
		  font-size: 19px;
		  color: var(--quinary);
		  background-color: var(--secondary);
		  padding-left: 5%;
		}
		.accordion-header {
		  display: flex;
		  cursor: pointer;
		  user-select: none;
		  font-family: 'Chau Philomene One';
		  font-size: 25px;
		  padding-top: 0.95%;
		  padding-bottom: 0.95%;
		  color: var(--quinary);
		  background-color: var(--other-secondary);
		  padding-left: 5%;
		  border: None;
		}
		.accordion-content {
		  max-height: 0;
		  overflow: hidden;
		  transition: max-height 0.01s;
		  background-color: var(--other-secondary); 
		}
		.material-icons
		{
			padding-left: 10%;
		}
		.qs-1
		{
			width: 4%;
			height: 30%;
			transform: translate(-2240%, 40%);
		}
	</style>