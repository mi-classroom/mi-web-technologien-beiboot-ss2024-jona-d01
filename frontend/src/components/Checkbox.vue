<script setup lang="ts">
const props = defineProps({
  id: String,
  name: String,
  modelValue: Boolean,
  label: String
})

const emit = defineEmits(['update:modelValue'])

function handleInput(event: Event) {
  const isChecked = (event.target as HTMLInputElement).checked
  emit('update:modelValue', isChecked)
}
</script>

<template>
  <div class="container">
    <label :for="props.name" class="checkbox-label">{{ props.label }}</label>
    <input
      class="input"
      :name="props.name"
      :id="props.id"
      type="checkbox"
      :checked="props.modelValue"
      @click="handleInput"
    />
    <div class="dash1">
      <div class="dash2"></div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
}

.container input {
  appearance: none;
  width: 2em;
  height: 2em;
  background-color: #171717;
  box-shadow: inset 2px 5px 10px rgb(5, 5, 5);
  border-radius: 5px;
  transition: 0.4s ease-in-out;
}

.container input:hover {
  scale: 1.2;
  cursor: pointer;
  box-shadow: none;
}

.container .dash1 {
  pointer-events: none;
  z-index: 2;
  position: absolute;
  left: 20%;
  width: 1.3em;
  height: 0.2em;
  background-color: red;
  rotate: 45deg;
  scale: 0;
  border-radius: 5px;
  transition: 0.4s ease-in-out;
}

.container .dash2 {
  pointer-events: none;
  z-index: 2;
  position: absolute;
  width: 1.3em;
  height: 0.2em;
  background-color: red;
  transform: rotate(90deg);
  border-radius: 5px;
  transition: 0.4s ease-in-out;
}

.container input:not(:checked) {
  box-shadow: none;
}

.container input:not(:checked) + .dash1 {
  transform: rotate(180deg);
  scale: 1.2;
}

input[type='checkbox'] + label {
  display: inline-block;
  padding: 10px;
  cursor: pointer;
  border: none;
  color: white;
  background-color: black;
  margin-bottom: 10px;
}

input[type='checkbox']:not(:checked) + label {
  border: none;
  color: black;
  background-color: white;
}

.checkbox-label {
  pointer-events: none;
  position: absolute;
  color: white;
  z-index: 1;
  font-size: 80%;
}

.input {
  border: 1px solid;
}
</style>
