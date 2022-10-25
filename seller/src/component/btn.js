Vue.component('vue-button', {
    props: [
        'btnText',    // 按钮文本内容
        'btnType',    // 按钮类型
        'btnSize',    // 按钮尺寸大小
        'btnOutline', // 只有边框的按钮样式
        'btnActive',  // 按钮状态，是一个布尔值，true表示激活（当前状态）
        'btnBlock'    // 按钮是不是块元素，是一个布遥值，true表示块元素
    ],
    template: `
        <button type="button" class="btn" 
            :class='[computedType, computedSize, computedOutline, computedActive, computedBlock]'
        >{{ btnText }}</button>
    `,
    computed: {
        // 控制按钮的类型
        computedType: function () {
            return `btn-${this.btnType}`
        },

        // 控制按钮大小尺寸
        computedSize: function () {
            return `btn-${this.btnSize}`
        },

        // 控制按钮边框
        computedOutline: function () {
            return `btn-outline-${this.btnOutline}`
        },

        // 控制按钮是否激活
        computedActive: function () {
            return  this.btnActive === 'true' ? 'active' : ''
        },

        // 控制按钮是否是块元素
        computedBlock: function () {
            return this.btnBlock === 'true' ? 'btn-block' : ''
        }
    }
})

let app = new Vue({
  el: '#app'
})