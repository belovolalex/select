<template>
  <dms-base-card title="Vehicle Сosts">
    <dms-row
      no-gutters
      class="dms-margin-b-1"
    >
      <dms-column class="dms-col-21">
        <dms-datepicker
          v-model="form.purchase_date"
          label="Purchase Date:"
          label-classes="dms-col-13 dms-margin-r-1"
          input-classes="dms-col-10"
          @input="onField($event, 'purchase_date')"
        />
      </dms-column>
    </dms-row>
    <dms-row
      no-gutters
      class="dms-margin-b-1"
    >
      <dms-column class="dms-col-21">
        <dms-input
          v-model="form.original_cost"
          type="number"
          rules="required|min_value:1"
          name="vehicle_costs.original_cost"
          label="*Original Cost, $:"
          label-classes="dms-col-13"
          input-classes="dms-col-10"
          @blur="onField($event, 'original_cost')"
        />
      </dms-column>
    </dms-row>
    <dms-row
      no-gutters
      class="dms-margin-b-1"
    >
      <dms-column class="dms-col-21">
        <dms-input
          v-model="form.buyers_fee"
          type="number"
          name="vehicle_costs.buyers_fee"
          label="Buyer’s Fee, $:"
          label-classes="dms-col-13"
          input-classes="dms-col-10"
          @blur="onField($event, 'buyers_fee')"
        />
      </dms-column>
    </dms-row>
    <dms-row
      no-gutters
      class="dms-margin-b-1 dms-align-items-center"
    >
      <dms-column class="dms-col-21">
        <dms-input
          v-model="form.lot_fee"
          type="number"
          name="vehicle_costs.lot_fee"
          label="Lot Fee, $:"
          label-classes="dms-col-13"
          input-classes="dms-col-10"
          @blur="onField($event, 'lot_fee')"
        />
      </dms-column>
      <dms-column>
        <dms-extra-button
          question
          @click="showPopup('lot-fee')"
        />
      </dms-column>
    </dms-row>

    <dms-row
      no-gutters
      class="dms-margin-b-1 dms-align-items-center"
    >
      <dms-column class="dms-col-21">
        <dms-input
          disabled
          type="number"
          name="added_cost"
          label="Added Cost, $:"
          label-classes="dms-col-13"
          input-classes="dms-col-10"
          :value="getAddedCosts"
        />
      </dms-column>
      <dms-column v-if="isVehicle">
        <dms-extra-button
          dots
          @click="onAddedCost"
        />
      </dms-column>
    </dms-row>

    <dms-row
      no-gutters
      class="dms-margin-b-1"
    >
      <dms-column class="dms-col-21">
        <dms-input
          v-model="form.floor_plan_cost"
          :disabled="!isFloorPlan"
          type="number"
          name="vehicle_costs.floor_plan_cost"
          label="Floor Plan Cost, $:"
          label-classes="dms-col-13"
          input-classes="dms-col-10"
          @blur="onField($event, 'floor_plan_cost')"
        />
      </dms-column>
    </dms-row>

    <dms-row
      no-gutters
      class="dms-margin-b-1"
    >
      <dms-column class="dms-col-21">
        <dms-input
          :value="getTotalCost"
          disabled
          type="number"
          name="total_cost"
          label="Total Cost, $:"
          label-classes="dms-col-13"
          input-classes="dms-col-10 dms-text-align-left"
        />
      </dms-column>
    </dms-row>

    <ui-row align-start>
      <p class="vehicle-costs__title">
        Pay Method:
      </p>
      <div>
        <radio
          v-model="form.payment_method"
          :value="PAYMENT_METHODS.CASH"
          class="dms-margin-b-1"
          name="payment_method"
          @input="onField($event, 'payment_method')"
        >
          Cash
        </radio>
        <radio
          v-model="form.payment_method"
          name="payment_method"
          :value="PAYMENT_METHODS.FLOOR"
          @input="onField($event, 'payment_method')"
        >
          Floor Plan
        </radio>
      </div>
    </ui-row>
    <dms-lot-fee />
    <added-costs :vehicle-info="getVehicleInfo" />
  </dms-base-card>
</template>

<script>
import AddedCosts from '@/js/popups/added-costs'
import DmsDatepicker from '@/js/components/ui/forms/datepicker/DmsDatepicker'
import DmsLotFee from '../popups/DmsLotFee'
import { Radio } from 'vue-checkbox-radio'

const DEFAULT_SUM = 0
const PAYMENT_METHODS = {
  CASH: 1,
  FLOOR: 2
}

export default {
  name: 'DmsVehicleCosts',
  components: {
    DmsDatepicker,
    Radio,
    DmsLotFee,
    AddedCosts
  },
  props: {
    formData: {
      type: Object,
      // eslint-disable-next-line no-empty-function
      default: () => {}
    },
    additionalInfo: {
      type: Object,
      // eslint-disable-next-line no-empty-function
      default: () => {}
    }
  },
  data() {
    return {
      form: {
        purchase_date: null,
        original_cost: null,
        buyers_fee: null,
        lot_fee: null,
        floor_plan_cost: null,
        payment_method: PAYMENT_METHODS.CASH,
        added_costs: []
      }
    }
  },
  computed: {
    isFloorPlan() {
      return this.form.payment_method === PAYMENT_METHODS.FLOOR
    },
    isVehicle() {
      return Number(this.$route.params.id) === this.additionalInfo.vehicleId
    },
    getTotalCost() {
      const IF_NAN = 0
      const valueToNumber = (value) => Number(value) || IF_NAN
      const form = { ...this.form }
      const fields = [form.original_cost, form.buyers_fee, form.lot_fee, form.floor_plan_cost]

      return fields.reduce((acc, field) => acc + valueToNumber(field), DEFAULT_SUM)
    },
    getAddedCosts() {
      const addedCosts = { ...this.form.added_costs }
      
      if(addedCosts && addedCosts.length) {
        return addedCosts.reduce((acc, value) => value.total_cost + acc, DEFAULT_SUM)
      }

      return DEFAULT_SUM
    },
    getVehicleInfo() {
      const { stock, year, make, model, trim, vin, vehicleId } = this.additionalInfo

      return {
        stock,
        year,
        make,
        model,
        trim,
        vin,
        vehicleId
      }
    }
  },
  watch: {
    formData: {
      immediate: true,
      handler(value) {
        if(Object.keys(value).length) {
          Object.assign(this.form, value)
        }
      }
    },
    'form.payment_method'(value) {
      if(value === PAYMENT_METHODS.CASH) {
        this.form.floor_plan_cost = null
      }
    }
  },
  created() {
    Object.assign(this, { PAYMENT_METHODS })
  },
  methods: {
    onAddedCost() {
      if(this.isVehicle) {
        this.showPopup('added-costs', { vehicleId: this.additionalInfo.vehicleId })
      }
    },
    onField(value, field) {
      this.$emit('onField', { value, field })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/sass/colors.scss";
.dms-base-container {
  margin-bottom: 8px;
}
.vehicle-costs__title {
  text-align: right;
  width: 47.8%;
  font-size: 14px;
  color: $gray;
  margin-bottom: 10px;
  margin-right: 6px;
}
</style>