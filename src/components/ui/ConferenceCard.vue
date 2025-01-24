<template>
    <div @click="$emit('select-conference', conference)"
        class="card p-4 mb-4 bg-white rounded-lg shadow cursor-pointer hover:bg-gray-100">
        <!-- Tag -->
        <div class="bg-custom-gradient text-white text-sm px-3 py-1 rounded-full mb-2">
            {{ conference.stage }}
        </div>

        <!-- Título -->
        <p class="font-bold text-gray-800">{{ conference.title }}</p>

        <!-- Horário -->
        <p class="text-sm text-gray-500">{{ conference.date }} • {{ conference.time }}</p>

        <!-- Localização -->
        <p class="text-sm text-gray-600 flex items-center mt-2">
            <svg class="w-4 h-4 text-gray-400 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16.5 9.4a6.7 6.7 0 11-9.5 0 6.7 6.7 0 019.5 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12v6m0-3h6m-6-3H6" />
            </svg>
            {{ conference.location }}
        </p>

        <!-- Row de Speakers -->
        <div class="flex mt-4 space-x-2">
            <img v-for="speaker in conference.speakers" :key="speaker.id" :src="speaker.image" alt="Speaker"
                class="w-8 h-8 rounded-full border border-gray-300">
        </div>
    </div>
</template>

<script>
export default {
    props: {
        conference: {
            type: Object,
            required: true,
        },
    },
};
</script>