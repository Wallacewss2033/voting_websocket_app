<template>
  <q-page class="q-pa-md">
    <div class="content">
      <div
        :key="confrontation.id"
        v-for="confrontation in confrontations"
        class="content-confrontations"
      >
        <div class="box-voting-team">
          <div class="shield">
            <img
              :src="`${urlEscudos}/${confrontation.teamsHome.escudo}`"
              class="img-shield"
            />
          </div>
          <div>
            <p class="name-time">{{ confrontation.teamsHome.name }}</p>
          </div>
          <div>
            <q-btn
              outline
              rounded
              class="btn-voting"
              label="Votar"
              @click="handleData(confrontation.id, true)"
            />
          </div>
        </div>
        <div class="scoreboard">
          <p class="font-scoreboard">
            {{ confrontation.teamsHome.wishes }} x {{ confrontation.teamsOutside.wishes }}
          </p>
        </div>
        <div class="box-voting-team">
          <div class="shield">
            <img
              :src="`${urlEscudos}/${confrontation.teamsOutside.escudo}`"
              class="img-shield"
            />
          </div>
          <div>
            <p class="name-time">{{ confrontation.teamsOutside.name }}</p>
          </div>
          <div>
            <q-btn
              outline
              rounded
              label="Votar"
              class="btn-voting"
              @click="handleData(confrontation.id)"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import teams from "../utils/teams.json";
import endPoint from "../services/EndPoints";
import { NotifyFails, NotifySuccess } from "../hooks/Notify";

export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      urlEscudos: `${process.env.URL_ESCUDOS.replace(/"/g, "")}`,
      confrontations: teams,
    };
  },
  mounted() {
    window.Echo.channel("game").listen("VotedEvent", (data) => {
      this.voting(data.voting);
    });
  },
  methods: {
    handleData(confrontationId, isHome = false) {
      this.fetchData({ confrontationId, isHome });
    },
    async fetchData(object = {}) {
      if (object === {}) {
        return;
      }
      await endPoint
        .post("/api/voting", object, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json",
          },
        })
        .then((response) => {
          NotifySuccess(response.message);
        })
        .catch(({ response }) => {
          NotifyFails(response.data.message);
        });
    },
    voting(voting = {}) {
      if (voting.confrontationId === null) {
        return;
      }

      if (voting.isHome) {
        this.confrontations[voting.confrontationId].teamsHome.wishes += 1;
        return;
      }
      this.confrontations[voting.confrontationId].teamsOutside.wishes += 1;
    },
  },
});
</script>

<style>
.box-voting-team {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 120px;
}

.scoreboard {
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.content-confrontations {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  border-radius: 10px;
  padding: 10px;
  width: 98%;
  background-color: #ffffff;
}

.content-confrontations + .content-confrontations {
  margin-top: 20px;
}

.name-time {
  font-size: 18px;
  font-weight: 600;
}

.shield {
  margin: 10px;
}

.img-shield {
  width: 100px;
  height: 100px;
}
.font-scoreboard {
  font-size: 48px;
  font-weight: 700;
}

.btn-voting {
  color: #262626 !important;
}

.bg-dark {
  background-color: rgb(41, 41, 41); /* Substitua pela cor desejada no modo escuro */
}

@media (max-width: 500px) {
  .content {
    padding: 0px;
  }

  .content-confrontations {
    width: 100%;
  }

  .img-shield {
    width: 50px;
    height: 50px;
    max-width: 150px;
  }

  .box-voting-team {
    width: 95px;
  }

  .font-scoreboard {
    font-size: 35px;
  }

  .name-time {
    font-size: 14px;
    font-weight: 600;
  }
}
</style>
