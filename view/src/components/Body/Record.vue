<template>
  <v-content>
    <v-card class="mx-auto mb-3" max-width="580" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">{{
            username
          }}</v-list-item-title>
          <v-list-item-subtitle>{{ text }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <v-layout justify-space-between>
          <v-btn v-if="personal" class="error" @click="deleteRecord()" text
            >Detete</v-btn
          >
          <div class="mt-4">Created at: {{ createdAt }}</div>
        </v-layout>
      </v-card-actions>

    </v-card>
  </v-content>
</template>

<script>
export default {
  methods: {
    deleteRecord: async function() {
      await this.$store.dispatch("delete", this);
    }
  },
  props: {
    personal: Boolean,
    username: String,
    text: String,
    createdAt: String,
    id: Number
  },
  data() {
    return {};
  },
  name: "Record"
};
</script>

<style scoped></style>
