<template>
    <div class="item-scheme">
        <Card>
          <div style="display: flex;justify-content: center;">
            <img src="test.png" style="width:2600px;height:600px " />
          </div>
            <!-- 放方案列表 -->
        <Table
        class="mt_10"
        :loading="loading"
        border
        :columns="columns"
        :data="data"
        ref="table"
      >
      </Table>
        </Card>
        <Modal v-model="showDetail" width="60">
          <p slot="header">
            <span>方案详情</span>
          </p>
          <div class="order-log-div">
            <Table
              :loading="showLoading"
              border
              :columns="componentColumns"
              :data="componentData"
              ref="table"
            ></Table>
          </div>
      <div slot="footer" style="text-align: right">
        <Button @click="showDetail = false">取消</Button>
      </div>
    </Modal>

    <Modal v-model="confirmScheme" width="60">
          <p slot="header">
            <span>方案确认</span>
          </p>
          <span>方案已全部确认</span>
      <div slot="footer" style="text-align: right">
        <Button v-if="display" @click="setGuaranty">执行交易</Button>
      </div>
    </Modal>


    </div>
</template>
<script>
import { getItemSchemeList, getSchemeDetail,checkItemScheme,saveGuaranty,setItemScheme ,testIbank} from '@/api/schemes'

export default {
   name:"item-scheme",
   data(){
    return{
    id: this.$route.query.itemid, // 项目id
    loading: true, // 表单加载状态
    showDetail:false,//展示方案详情
    confirmScheme:false,//方案确认
    checkNum:0,
    showLoading:false,
    display:true,
    searchForm:{
      pageNumber: 1, // 当前页数
      pageSize: 10, // 页面大小
    },
    guarantyForm:{
      primaryId:1,
      // schemeSum:0,
      // payFlag:0,
      orderName:this.$route.query.itemName+'项目',
      orderContent:this.$route.query.itemName+'内容',
      buyerId:this.$route.query.buyerId
    },
    componentColumns:[
        {
          title: "零件名称",
          key: "componentName",
          width: 100,
          tooltip: true,
        },
        {
          title: "零件单价",
          key: "componentUnitPrice",
          width: 200,
          tooltip: true,
        },
        {
          title: "零件个数",
          key: "componentNumber",
          width: 200,
          tooltip: true,
        },
    ],
    columns: [
        {
          title: "门编号",
          key: "doorId",
          width: 90,
          tooltip: true,
        },
        {
          title: "房间功能",
          key: "roomFunction",
          width: 90,
          tooltip: true,
        },
        {
          title: "高",
          key: "height",
          width: 90,
          tooltip: true,
        },
        {
          title: "宽",
          key: "width",
          width: 90,
          tooltip: true,
        },
        {
          title: "厚度",
          key: "thickness",
          width:90,
          tooltip: true,
        },
        {
          title: "重",
          key: "weight",
          width:90,
          tooltip: true,
        },
        {
          title: "门扇形状",
          key: "doorShape",
          width:90,
          tooltip: true,
        },
        {
          title: "开启方式",
          key: "openMethod",
          width: 90,
          tooltip: true,
        },
        {
          title: "开启方向",
          key: "openDirection",
          width: 90,
          tooltip: true,
        },
        {
          title: "门框组合形式",
          key: "groupType",
          width: 100,
          tooltip: true,
        },
        {
          title: "材质",
          key: "texture",
          width:  90,
          tooltip: true,
        },
        {
          title: "企口形式",
          key: "qkType",
          width:  90,
          tooltip: true,
        },
        {
          title: "防火等级",
          key: "firerating",
          width: 100,
          tooltip: true,
        },
        {
          title: "把手/拉手",
          key: "handle",
          width:90,
          tooltip: true,
        },
        {
          title: "门禁",
          key: "guard",
          width: 90,
          tooltip: true,
        },
        {
          title: "五金组名称",
          key: "wjgroup",
          width:  100,
          tooltip: true,
        },
        {
          title: "方案状态",
          key: "action",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    // type: "info",
                    size: "small",
                  },
                  attrs: {
                    disabled:
                        (params.row.checkFlag=== 1
                          )

                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.checkScheme(params.row);
                    },
                  },
                },
                "通过"
              ),])
          }
        },

      ],
      data: [], // 表单数据
      componentData:[],//方案零件数据
      componentTotal:0,
      total: 0, // 表单数据总数
    }
   },
   methods:{
    //初始化所有方案数据
    init() {
      this.getDataList();
    },
    getDataList() {
      this.loading = true;
      //看项目有没有生成方案
      this.searchForm.itemId=this.id
      this.searchForm.schemeId=1
      getItemSchemeList(this.searchForm).then((res) => {
        this.loading = false;
        if (res.result.records.length==0) {
          //没有生成
          setItemScheme(this.id).then((Res)=>{
            this.searchForm.itemId=''
            this.getDataList()
          })
        }else{
          //生成了
          this.data = res.result.records;   
          this.total = res.result.total;
          this.checkNum=0
          let tmp=0
          this.data.forEach(function(e){
            tmp=tmp+Number(e.checkFlag)
        })
        this.checkNum=tmp
          if (this.checkNum==this.total){
            this.confirmScheme=true
            this.display=false
          }
          console.log(this.data)
          this.countCheck(this.data,this.total)
          console.log("查看方案列表的count")
          console.log(this.checkNum)
        }
      });
      //再查找有没有生成保证单
      
    },
    //展示方案详情
    // showSchemeDetail(v){
    //   this.searchForm.schemeId=v.schemeId
    //   this.showLoading=true
    //   getSchemeDetail(this.searchForm).then((res)=>{
    //     this.showLoading=false
    //     if(res.success){
    //       this.componentData = res.result.records
    //       this.showDetail=true
    //       this.searchForm.schemeId=''
    //     }
    //   })
    // },
    //确认方案,只需要设checkFlag=1
    checkScheme(v){
      this.searchForm.primaryId=v.primaryId
      // testIbank().then((res)=>{
        // console.log('银联')
        // console.log(res)
        // window.localStorage.setItem('callbackHTML', res)
        //             var newWin = window.open('', '_blank')
        //             newWin.document.write(localStorage.getItem('callbackHTML'))
      // })
      // getSchemeDetail(this.searchForm).then((res)=>{
      //   if(res.success){
      //     res.result.records.forEach(item=>{
      //       this.guarantyForm.schemeSum=Number(item.componentUnitPrice)*Number(item.componentNumber)+this.guarantyForm.schemeSum
      //     })
      //     }
      //   })
      //再更新item_scheme表,设置履约保证单
      checkItemScheme(v.primaryId).then((res)=>{
        if(res.success){
          v.checkFlag=1
          this.checkNum=this.checkNum+1
          if (this.checkNum==this.total){
            this.confirmScheme=true
          }
        }
      })
    },
    setGuaranty(){
      // this.guarantyForm.schemeId=1;
      console.log("?")
      console.log(this.guarantyForm)
      let params = JSON.parse(JSON.stringify(this.guarantyForm));
      this.$router.push({ name: "deal", query: { Form: this.guarantyForm } });
      // saveGuaranty(params).then((res)=>{
      //   this.$router.push({ name: "deal", query: { Form: this.guarantyForm } });
      // })

    }
  },
   mounted() {
    this.init();
  },
  mounted() {
    this.init();
  },
}
</script>
