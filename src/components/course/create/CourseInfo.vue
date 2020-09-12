<template>
	<InputGroup  
	    v-model="course.name"
	    label="Name"
	    type="text"
	/>

	<InputGroup  
	    v-model="course.description"
	    label="Description"
	    type="text"
	/>

	<InputGroup  
	    v-model="course.description"
	    label="Cover Image"
	    type="file"
	/>

	<slot></slot>
</template>

<script>
export default {
	data() {
		
	}
}
</script>