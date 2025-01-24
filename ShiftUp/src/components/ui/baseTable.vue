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
        <tr
          v-for="(row, rowIndex) in rows"
          :key="rowIndex"
          class="bg-white border-b hover:bg-gray-50"
        >
          <td
            v-for="column in columns"
            :key="column.field"
            class="px-6 py-4"
          >
            <!-- Verifica se a coluna é de ação -->
            <template v-if="column.label === 'Action'">
              <button
                class="bg-blue-600 text-white rounded px-2 py-1 mr-2 hover:bg-blue-700"
                @click="$emit('editItem', row)"
              >
                Edit
              </button>
              <button
                class="bg-red-600 text-white rounded px-2 py-1 hover:bg-red-700"
                @click="$emit('deleteItem', row)"
              >
                Delete
              </button>
            </template>

            <template v-else-if="column.label === 'Password'">
              ******
            </template>

            <!-- Caso contrário, exibe o valor normalmente -->
            <template v-else>
              {{ row[column.field] }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else class="text-center text-gray-500 py-4">No data found</p>
  </div>
</template>

<script>
export default {
  name: "BaseTable",
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    rows: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
