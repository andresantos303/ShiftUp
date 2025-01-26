<template>
  <div>
    <HeaderP />

    <div class="container mx-auto px-[232px] py-8">
      <!-- Title -->
      <h1 class="text-3xl font-bold text-center text-custom-gradient-start mb-6">Volunteer with Us!</h1>

      <!-- Info Section -->
      <div class="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Why Volunteer?</h2>
        <p class="text-gray-600">
          Volunteering with us is a great opportunity to contribute to our events, meet amazing people, and gain
          valuable
          experience. As a volunteer, you'll receive exclusive benefits, including free tickets to certain events, a
          special
          volunteer kit, and a certificate of participation.
        </p>
        <h3 class="text-lg font-medium text-gray-800 mt-6">Roles Available:</h3>
        <ul class="list-disc list-inside text-gray-600 mt-2">
          <li>Event Setup and Logistics</li>
          <li>Guest Assistance</li>
          <li>Registration and Check-in</li>
          <li>Technical Support</li>
        </ul>
      </div>

      <!-- Volunteer Form -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Sign Up to Volunteer</h2>

        <form @submit.prevent="submitForm" class="space-y-6">
          <!-- Name -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" id="name" v-model="formData.name"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-custom-gradient-start focus:border-custom-gradient-start"
              placeholder="Enter your full name" required />
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" id="email" v-model="formData.email"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-custom-gradient-start focus:border-custom-gradient-start"
              placeholder="Enter your email" required />
          </div>

          <!-- Interests -->
          <div>
            <label for="interests" class="block text-sm font-medium text-gray-700">Interests</label>
            <textarea id="interests" v-model="formData.interests"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-custom-gradient-start focus:border-custom-gradient-start"
              placeholder="Tell us why you're interested in volunteering" rows="4"></textarea>
          </div>

          <!-- Availability -->
          <div>
            <label for="availability" class="block text-sm font-medium text-gray-700">Availability</label>
            <select id="availability" v-model="formData.availability"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-custom-gradient-start focus:border-custom-gradient-start"
              required>
              <option value="" disabled>Select your availability</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Weekends Only">Weekends Only</option>
            </select>
          </div>

          <!-- Submit Button -->
          <div>
            <Button :label="'Submit Application'" :to="''" @click="submitForm" :bgColor="'bg-custom-gradient'" :textColor="'text-white'"
              :additionalClasses="'w-full font-medium py-3 hover:opacity-90 focus:ring-2 focus:ring-custom-gradient-start focus:ring-opacity-50'" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderP from "@/components/HeaderP.vue";
import Button from "../../components/ui/button.vue";

export default {
  components: {
    HeaderP,
    Button, // Importando o componente de botão reutilizável
  },
  data() {
    return {
      formData: {
        name: "",
        email: "",
        interests: "",
        availability: "",
      },
    };
  },
  methods: {
    submitForm() {
      console.log("Volunteer Form Submitted:", this.formData);
      alert("Thank you for signing up to volunteer!");

      // Reset the form after submission
      this.formData = {
        name: "",
        email: "",
        interests: "",
        availability: "",
      };
    },
  },
  data() {
    return {
      formData: {
        name: "",
        email: "",
        interests: "",
        availability: "",
      },
    };
  },
  methods: {
    submitForm() {
      console.log("Volunteer Form Submitted:", this.formData);
      alert("Thank you for signing up to volunteer!");

      // Reset the form after submission
      this.formData = {
        name: "",
        email: "",
        interests: "",
        availability: "",
      };
    },
  },
};
</script>
