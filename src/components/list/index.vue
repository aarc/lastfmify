<template>
  <dl class="user-info">
    <dt v-if="title">{{ title }}</dt>
    <dd v-if="!parsedData">NO DATA</dd>
    <dd v-else v-for="{key, value} in parsedData" :key="key">{{key}}: {{ value }}</dd>
  </dl>
</template>
<script>
export default {
  name: 'list',
  computed: {
    parsedData() {
      const data = this.data;

      if (typeof data === 'object' && data !== null) {
        return Object.keys(data)
          .sort()
          .reduce((arr, key) => {
            arr.push({
              key: key,
              value: data[key]
            });

            return arr;
          }, []);
      }

      return null;
    }
  },
  props: {
    title: null,
    data: null
  }
}
</script>