<script>


import { debounce } from 'lodash';

/**
 * Данный миксин предназначен для упрощения создания AutoComplete полей
 * и отвечает за формирования cache и отслеживания loadingStatus
 */
export default {
  name: 'FveSelectPluginAcHelper',

  data() {
    return {
      acSearchText: '',
      acCacheObj: {},
    };
  },

  computed: {
    acData() {
      return this.acCacheObj[this.acSearchText]?.data;
    },
    acLoadStatus() {
      return this.acCacheObj[this.acSearchText]?.loadStatus || 'NONE'; //
    },
  },

  methods: {
    // Необходимо переопределить данную функцию!!!
    acRequest(searchText) {
      return Promise.reject('method "requestRmGetMethod" not overridden');
    },

    //
    acSearchTextUpdate(text) {
      this.acSearchText = text;
      const cache = this.acCacheObj[this.acSearchText];
      if (cache && (cache.loadStatus !== 'SUCCESS' || cache.loadStatus !== 'LOADING') ) {
        return;
      }
      this.acLoad(this.acSearchText);
    },

    acLoad(str) {
      //
      this.acCacheObj[str] = {
        loadStatus: 'LOADING',
        data: null,
      };

      this.acRequest(str)
        .then(
          (list) => {
            this.acCacheObj[str].loadStatus = 'SUCCESS';
            this.acCacheObj[str].data = list;
          },
          (err) => {
            console.warn(err);
            this.acCacheObj[str].loadStatus = 'ERROR';
          }
        )
        .finally(() => {
          if(this.acCacheObj[str].loadStatus === 'LOADING') {
            this.acCacheObj[str].loadStatus = 'ERROR';
          }
        });
    },


    acSearchTextUpdateDebounce: debounce(function (str) {
      this.acSearchTextUpdate(str);
    }, 800),
  },
};
</script>
