<template>
  <div>
    <table v-if="rows && rows.length" class="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th v-for="column in columns" :key="column.field" class="px-6 py-3">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index" class="bg-white border-b hover:bg-gray-50">
          <td v-for="column in columns" :key="column.field" class="px-6 py-4">
            {{ row[column.field] }}
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else class="text-center text-gray-500 py-4">No data found</p>
  </div>
</template>

<script>
export default {
  props: {
    columns: Array,
    rows: Array,
  },
};
</script>
