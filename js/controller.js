app.controller("TTRController", ['$scope', '$timeout', 'AgeCalculator', 'PdfMaker', 'LineChartService', function($scope, $timeout, AgeCalculator, PdfMaker, LineChartService) {

  $scope.infoShow = function(value) {
      if (value) {
          document.getElementsByClassName("information-overlay")[0].style.visibility = "visible";
          document.getElementsByClassName("information-overlay")[0].style.zIndex = "9999";
          document.getElementsByClassName("information-overlay")[0].style.position = "inline-block";
          document.getElementsByClassName("information-overlay")[0].style.height = "" + (document.getElementsByClassName("otrp-calculator")[0].clientHeight - 10) + "px";
      } else {
          document.getElementsByClassName("information-overlay")[0].style.visibility = "hidden";
      }
  }



    String.prototype.replaceAll = function(search, replacement) {
            var target = this;
            return target.split(search).join(replacement);
        };

        function PV(rate, periods, payment, future, type) {
                var type = (typeof type === 'undefined') ? 0 : type;
                rate = eval(rate);
                periods = eval(periods);
                if (rate === 0) {
                    return -payment * periods - future;
                } else {
                    return (((1 - Math.pow(1 + rate, periods)) / rate) * payment * (1 + rate * type) - future) / Math.pow(1 + rate, periods);
                }
            }



    $scope.IntroductoryRate2 = 3.99,
    $scope.loanTermYear = 30,
    $scope.upfrontFeesInpu2= 600,
    $scope.loanAmount = 500000,
    $scope.ongoingFees1 = 10,
    $scope.upfrontFees1 = 400,
    $scope.AreYouSingleOrCouple = "Couple",
    $scope.ongoingFees2 = 8,
    $scope.ongoingRate1 = 6,
    $scope.IntroductoryTerm1 = 0,
    $scope.ongoingRate2 = 6.50,
    $scope.introductoryTerm2 = 0,

    $scope.GenderOfMember1 = "Male",
    $scope.GenderOfMember2 = "Female",
    $scope.IntroductoryRate1 = 4.50;

    $scope.genderMmbr1 = false; //false for male
    $scope.genderMmbr2 = true; //true for female
    var pvUnderTheIntroductoryTerm = [];

    //all blank value array
    $scope.year = [],


    $scope.moreLoanOption = true;





    console.log(pvUnderTheIntroductoryTerm)


    //Mapping-Frequency per month-Repayment Cycle
    function reypaymentValue(mapping){
    var mappingFrequencyRepayment = [
      {
        mapping:"Weekly",
        frequency:(365/12)/(365/52),
        repayment:52
      },
      {
        mapping:"Fortnightly",
        frequency:(365/12)/(365/26),
        repayment:26
      },
      {
        mapping:"Monthly",
        frequency:1,
        repayment:12
      },
      {
        mapping:"Annually",
        frequency:1/12,
        repayment:1
      }
    ]
    var getMapping = -1;

    for(i=0; i<mappingFrequencyRepayment.length; i++){

      if(mappingFrequencyRepayment[i].mapping == mapping){
          getMapping = i;
          break;
      }
    }
    return mappingFrequencyRepayment[getMapping].repayment;

  }

  var monthlyReypayment = reypaymentValue("Monthly");





/***********************************************************
             slider range and input
************************************************************/
    var loanTermYearSlider = document.getElementById("loanTermYearSlider");
    var loanTermYearInput = document.getElementById("loanTermYearInput");
    //$scope.initialInvestmentAmountNew=$scope.member1Age;
    noUiSlider.create(loanTermYearSlider, {
        start: $scope.loanTermYear,
        range: {
            min: [1],
            max: [100]
        },
        format: wNumb({
            decimals: 0,
            thousand: ','
        }),
        connect: 'lower'
    });

    loanTermYearSlider.noUiSlider.on('update', function(values, handle) {
        loanTermYearInput.value = values[handle];
        $scope.loanTermYearInput = values[handle];
    });
    loanTermYearSlider.noUiSlider.on('set', function(values, handle) {
        loanTermYearInput.value = values[handle];
        $scope.loanTermYearInput = values[handle];
    });

    loanTermYearInput.addEventListener("change", function() {
        loanTermYearSlider.noUiSlider.set(loanTermYearInput.value);
    });



    //slider-3 input-3
    var IntroductoryRateSlider1 = document.getElementById("IntroductoryRateSlider1");
    var IntroductoryRateInput1 = document.getElementById("IntroductoryRateInput1");

    //$scope.IntialVal3 =$scope.EstimatedInterestRate;
    noUiSlider.create(IntroductoryRateSlider1, {
        start: $scope.IntroductoryRate1,
        range: {
            min: [0],
            max: [100]
        },
        format: wNumb({
            decimals: 2,
            postfix: ' %',
            thousand: ','
        }),
        connect: 'lower'
    });
    IntroductoryRateSlider1.noUiSlider.on('update', function(values, handle) {
        IntroductoryRateInput1.value = values[handle];
        $scope.IntroductoryRate1 = values[handle];
    });
    IntroductoryRateSlider1.noUiSlider.on('set', function(values, handle) {
        IntroductoryRateInput1.value = values[handle];
        $scope.IntroductoryRate1 = values[handle];
    });
    IntroductoryRateInput1.addEventListener("change", function() {
        IntroductoryRateSlider1.noUiSlider.set(IntroductoryRateInput1.value);
    });


    //slider-4 input-4
    var IntroductoryRateSlider2 = document.getElementById("IntroductoryRateSlider2");
    var IntroductoryRateInput2 = document.getElementById("IntroductoryRateInput2");

    //$scope.IntialVal4 =$scope.Inflation;
    noUiSlider.create(IntroductoryRateSlider2, {
        start: $scope.IntroductoryRate2,
        range: {
            min: [0],
            max: [100]
        },
        format: wNumb({
            decimals: 2,
            postfix: ' %',
            thousand: ','
        }),
        connect: 'lower'
    });
    IntroductoryRateSlider2.noUiSlider.on('update', function(values, handle) {
        IntroductoryRateInput2.value = values[handle];
        $scope.IntroductoryRate2 = values[handle];
    });
    IntroductoryRateSlider2.noUiSlider.on('set', function(values, handle) {
        IntroductoryRateInput2.value = values[handle];
        $scope.IntroductoryRate2 = values[handle];
    });
    IntroductoryRateInput2.addEventListener("change", function() {
        IntroductoryRateSlider2.noUiSlider.set(IntroductoryRateInput2.value);
    });

    //slider-5 input-5
    var upfrontFeesSlider2 = document.getElementById("upfrontFeesSlider2");
    var upfrontFeesInput2 = document.getElementById("upfrontFeesInput2");

    //$scope.IntialVal5 =$scope.SalaryExcludeTaxAndSuperPerYearMember1;
    noUiSlider.create(upfrontFeesSlider2, {
        start: $scope.upfrontFeesInpu2,
        range: {
            min: [100],
            max: [1000000]
        },
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: 'lower'
    });
    upfrontFeesSlider2.noUiSlider.on('update', function(values, handle) {
        upfrontFeesInput2.value = values[handle];
        $scope.upfrontFeesInpu2 = values[handle];
    });
    upfrontFeesSlider2.noUiSlider.on('set', function(values, handle) {
        upfrontFeesInput2.value = values[handle];
        $scope.upfrontFeesInpu2 = values[handle];
    });
    upfrontFeesInput2.addEventListener("change", function() {
        upfrontFeesSlider2.noUiSlider.set(upfrontFeesInput2.value);
    });



    //slider-7 input-7
    var slider7 = document.getElementById("slider7");
    var input7 = document.getElementById("input7");

    //$scope.IntialVal7 =$scope.InvestmentIncomePerYear;
    noUiSlider.create(slider7, {
        start: $scope.loanAmount,
        range: {
            min: [1000],
            max: [1000000]
        },
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: 'lower'
    });
    slider7.noUiSlider.on('update', function(values, handle) {
        input7.value = values[handle];
        $scope.loanAmount = values[handle];
    });
    slider7.noUiSlider.on('set', function(values, handle) {
        input7.value = values[handle];
        $scope.loanAmount = values[handle];
    });
    input7.addEventListener("change", function() {
        slider7.noUiSlider.set(input7.value);
    });

    //slider-8 input-8
    var ongoingFeesSlider1 = document.getElementById("ongoingFeesSlider1");
    var ongoingFeesInput1 = document.getElementById("ongoingFeesInput1");

    noUiSlider.create(ongoingFeesSlider1, {
        start: $scope.ongoingFees1,
        range: {
            min: [0],
            max: [1000000]
        },
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: 'lower'
    });
    ongoingFeesSlider1.noUiSlider.on('update', function(values, handle) {
        ongoingFeesInput1.value = values[handle];
        $scope.ongoingFees1 = values[handle];
    });
    ongoingFeesSlider1.noUiSlider.on('set', function(values, handle) {
        ongoingFeesInput1.value = values[handle];
        $scope.ongoingFees1 = values[handle];
    });
    ongoingFeesInput1.addEventListener("change", function() {
        ongoingFeesSlider1.noUiSlider.set(ongoingFeesInput1.value);
    });

    //slider-9 input-9
    var UpfrontFeesSlider1 = document.getElementById("UpfrontFeesSlider1");
    var UpfrontFeesInput1 = document.getElementById("UpfrontFeesInput1");

    noUiSlider.create(UpfrontFeesSlider1, {
        start: $scope.upfrontFees1,
        range: {
          min: [100],
          max: [1000000]
        },
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: 'lower'
    });
    UpfrontFeesSlider1.noUiSlider.on('update', function(values, handle) {
        UpfrontFeesInput1.value = values[handle];
        $scope.upfrontFees1 = values[handle];
    });
    UpfrontFeesSlider1.noUiSlider.on('set', function(values, handle) {
        UpfrontFeesInput1.value = values[handle];
        $scope.upfrontFees1 = values[handle];
    });
    UpfrontFeesInput1.addEventListener("change", function() {
        UpfrontFeesSlider1.noUiSlider.set(UpfrontFeesInput1.value);
    });





    //slider-11 input-11
    var ongoingRateSlider1 = document.getElementById("ongoingRateSlider1");
    var ongoingRateInput1 = document.getElementById("ongoingRateInput1");

    //$scope.IntialVal11 =$scope.CurrentInterestRatePerYear;
    noUiSlider.create(ongoingRateSlider1, {
        start: $scope.ongoingRate1,
        range: {
          min: [0],
          max: [100]
        },
        format: wNumb({
            decimals: 2,
            postfix: '%',
            thousand: ','
        }),
        connect: 'lower'
    });
    ongoingRateSlider1.noUiSlider.on('update', function(values, handle) {
        ongoingRateInput1.value = values[handle];
        $scope.ongoingRate1 = values[handle];
    });
    ongoingRateSlider1.noUiSlider.on('set', function(values, handle) {
        ongoingRateInput1.value = values[handle];
        $scope.ongoingRate1 = values[handle];
    });
    ongoingRateInput1.addEventListener("change", function() {
        ongoingRateSlider1.noUiSlider.set(ongoingRateInput1.value);
        //$scope.InterestRate057 = Math.pow(1+$scope.CurrentInterestRatePerYearInMoreLoan, 1/12) - 1;

    });


    //slider-12 input-12
    var IntroductoryTermSlider1 = document.getElementById("IntroductoryTermSlider1");
    var IntroductoryTermInput1 = document.getElementById("IntroductoryTermInput1");

    //$scope.IntialVal12 =$scope.RemainingLoanTermYears;
    noUiSlider.create(IntroductoryTermSlider1, {
        start: $scope.IntroductoryTerm1,
        range: {
          min: [0],
          max: [100]
        },
        format: wNumb({
            decimals: 0,
            thousand: ','
        }),
        connect: 'lower'
    });

    IntroductoryTermSlider1.noUiSlider.on('update', function(values, handle) {
        IntroductoryTermInput1.value = values[handle];
        $scope.RemainingLoanTermYears = values[handle];
    });
    IntroductoryTermSlider1.noUiSlider.on('set', function(values, handle) {
        IntroductoryTermInput1.value = values[handle];
        $scope.RemainingLoanTermYears = values[handle];
    });
    IntroductoryTermInput1.addEventListener("change", function() {
        IntroductoryTermSlider1.noUiSlider.set(IntroductoryTermInput1.value);
    });

    //slider-14 input-14
    var ongoingRateSlider2 = document.getElementById("ongoingRateSlider2");
    var ongoingRateInput2 = document.getElementById("ongoingRateInput2");

    noUiSlider.create(ongoingRateSlider2, {
        start: $scope.ongoingRate2,
        range: {
          min: [0],
          max: [100]
        },
        format: wNumb({
            decimals: 2,
            postfix: '%',
            thousand: ','
        }),
        connect: 'lower'
    });
    ongoingRateSlider2.noUiSlider.on('update', function(values, handle) {
        ongoingRateInput2.value = values[handle];
        $scope.ongoingRate2 = values[handle];
    });
    ongoingRateSlider2.noUiSlider.on('set', function(values, handle) {
        ongoingRateInput2.value = values[handle];
        $scope.ongoingRate2 = values[handle];
    });
    ongoingRateInput2.addEventListener("change", function() {
        ongoingRateSlider2.noUiSlider.set(ongoingRateInput2.value);
    });

    //slider-15 input-15
    var IntroductoryTermSlider2 = document.getElementById("IntroductoryTermSlider2");
    var IntroductoryTermInput2 = document.getElementById("IntroductoryTermInput2");

    noUiSlider.create(IntroductoryTermSlider2, {
        start: $scope.introductoryTerm2,
        range: {
          min: [0],
          max: [100]
        },
        format: wNumb({
            decimals: 0,
            thousand: ','
        }),
        connect: 'lower'
    });
    IntroductoryTermSlider2.noUiSlider.on('update', function(values, handle) {
        IntroductoryTermInput2.value = values[handle];
        $scope.introductoryTerm2 = values[handle];
    });
    IntroductoryTermSlider2.noUiSlider.on('set', function(values, handle) {
        IntroductoryTermInput2.value = values[handle];
        $scope.introductoryTerm2 = values[handle];
    });
    IntroductoryTermInput2.addEventListener("change", function() {
        IntroductoryTermSlider2.noUiSlider.set(IntroductoryTermInput2.value);
    });

    //slider-16 input-16
    var ongoingFeesSlider2 = document.getElementById("ongoingFeesSlider2");
    var ongoingFeesInput2 = document.getElementById("ongoingFeesInput2");

    noUiSlider.create(ongoingFeesSlider2, {
        start: $scope.ongoingFees2,
        range: {
          min: [0],
          max: [1000000]
        },
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: 'lower'
    });
    ongoingFeesSlider2.noUiSlider.on('update', function(values, handle) {
        ongoingFeesInput2.value = values[handle];
        $scope.ongoingFees2 = values[handle];
    });
    ongoingFeesSlider2.noUiSlider.on('set', function(values, handle) {
        ongoingFeesInput2.value = values[handle];
        $scope.ongoingFees2 = values[handle];
    });
    ongoingFeesInput2.addEventListener("change", function() {
        ongoingFeesSlider2.noUiSlider.set(ongoingFeesInput2.value);
    });

    //my var
    $scope.DoesThisLoanHasAnIntroductoryRateLoan1 = "No";
    $scope.DoesThisLoanHasAnIntroductoryRateLoan2 = "No";
    var loanTerm = [0],
        LoanOutstandingAtTheBeginningLoan1 = [],
        InterestRepaymentLoan1 = [],
        EffectiveRepaymentCycleRateLoan1 = [],
        EffectiveRepaymentCycleRateLoan2 = [],
        PrincipalRepayment = [],
        pvUnderTheIntroductoryTerm = [],
        IntroductoryPeriodRepaymentAmountPerRepaymentCycle = [],
        loanOutstandingBalanceAtTheEndOTheIntroductoryTerm = [],
        pvUnderTheOngoingInterestRateAndTerm = [],
        remainingTermRepaymentAmountPerRepaymentCycle = [],
        accountFeeLoan1 = [],
        loanOutstandingBalanceAtTheEndLoan1 = []




    $scope.calculateFinal=function(isValid){


      if (isValid && !$scope.error1option && !$scope.error2option) {
        var IntroductoryRate1 = Number($scope.IntroductoryRate1.replaceAll('%', ''));
        var IntroductoryRate2 = Number($scope.IntroductoryRate2.replaceAll('%', ''));
        var loanTermYearInput = Number($scope.loanTermYearInput.replaceAll('%', ''));
        var upfrontFeesInpu2 = Number($scope.upfrontFeesInpu2.replaceAll('$', '').replaceAll(',', ''));
        var loanAmount = Number($scope.loanAmount.replaceAll('$', '').replaceAll(',', ''));
        var ongoingFees1 = Number($scope.ongoingFees1.replaceAll('$', '').replaceAll(',', ''));
        var upfrontFees1 = Number($scope.upfrontFees1.replaceAll('$', '').replaceAll(',', ''));
        var ongoingFees2 = Number($scope.ongoingFees2.replaceAll('$', '').replaceAll(',', ''));
        var ongoingRate1 = Number($scope.ongoingRate1.replaceAll('%', ''));
        var ongoingRate2 = Number($scope.ongoingRate2.replaceAll('%', ''));
        var loanAmount = Number($scope.loanAmount.replaceAll('$', '').replaceAll(',', ''));


        EffectiveRepaymentCycleRateLoan1[0] = Math.pow(1+IntroductoryRate1/100 ,1/monthlyReypayment) - 1;//(1+B9)^(1/$C$3)-1
        EffectiveRepaymentCycleRateLoan1[1] = Math.pow(1+ongoingRate1/100 ,1/monthlyReypayment)-1 // =(1+B13)^(1/$C$3)-1
        EffectiveRepaymentCycleRateLoan2[0] = Math.pow(1+IntroductoryRate2/100 ,1/monthlyReypayment)-1 // (1+C9)^(1/$C$3)-1
        EffectiveRepaymentCycleRateLoan2[1] = Math.pow(1+ongoingRate2/100 ,1/monthlyReypayment)-1 //(1+C13)^(1/$C$3)-1

        //PV under the introductory term

        if($scope.DoesThisLoanHasAnIntroductoryRateLoan1 == "Yes"){
          pvUnderTheIntroductoryTerm[0] = Math.abs(PV(EffectiveRepaymentCycleRateLoan1[0],$scope.loanTermYear*monthlyReypayment,1,0,0))  //
        }else{
          pvUnderTheIntroductoryTerm[0] = Math.abs(PV(EffectiveRepaymentCycleRateLoan1[1],$scope.loanTermYear*monthlyReypayment,1,0,0))
        }
        
        if($scope.DoesThisLoanHasAnIntroductoryRateLoan2=="Yes"){
          pvUnderTheIntroductoryTerm[1] = Math.abs(PV(EffectiveRepaymentCycleRateLoan2[0],$scope.loanTermYear*monthlyReypayment,1,0,0))
        }else{
          pvUnderTheIntroductoryTerm[1] = Math.abs(PV(EffectiveRepaymentCycleRateLoan2[1],$scope.loanTermYear*monthlyReypayment,1,0,0));
        }

        //Introductory period repayment amount per repayment cycle (exclude fees)


        IntroductoryPeriodRepaymentAmountPerRepaymentCycle[0] = loanAmount/pvUnderTheIntroductoryTerm[0]
        IntroductoryPeriodRepaymentAmountPerRepaymentCycle[1] = loanAmount/pvUnderTheIntroductoryTerm[1]

      

        if($scope.DoesThisLoanHasAnIntroductoryRateLoan1 == "Yes"){
            loanOutstandingBalanceAtTheEndOTheIntroductoryTerm[0]  = loanAmount+PV(EffectiveRepaymentCycleRateLoan1[0],monthlyReypayment*$scope.IntroductoryTerm1,IntroductoryPeriodRepaymentAmountPerRepaymentCycle[0],0,0);
        }else{
            loanOutstandingBalanceAtTheEndOTheIntroductoryTerm[0]  = loanAmount+PV(EffectiveRepaymentCycleRateLoan1[1],monthlyReypayment*$scope.IntroductoryTerm1,IntroductoryPeriodRepaymentAmountPerRepaymentCycle[0],0,0);
        }

        if($scope.DoesThisLoanHasAnIntroductoryRateLoan2 == "Yes"){
          loanOutstandingBalanceAtTheEndOTheIntroductoryTerm[1] = loanAmount+PV(EffectiveRepaymentCycleRateLoan2[0],monthlyReypayment*$scope.introductoryTerm2,IntroductoryPeriodRepaymentAmountPerRepaymentCycle[1],0,0)
        }else{
          loanOutstandingBalanceAtTheEndOTheIntroductoryTerm[1] = loanAmount+PV(EffectiveRepaymentCycleRateLoan2[1],monthlyReypayment*$scope.introductoryTerm2,IntroductoryPeriodRepaymentAmountPerRepaymentCycle[1],0,0)
        }

        //PV under the ongoing interest rate and term
       
        pvUnderTheOngoingInterestRateAndTerm[0] =-PV(EffectiveRepaymentCycleRateLoan1[1],($scope.loanTermYear-$scope.IntroductoryTerm1)*monthlyReypayment,1,0,0)
        pvUnderTheOngoingInterestRateAndTerm[1] = -PV(EffectiveRepaymentCycleRateLoan2[1],($scope.loanTermYear-$scope.IntroductoryTerm1)*monthlyReypayment,1,0,0)

        //Remaining term repayment amount per repayment cycle (exclude fees)
        

        remainingTermRepaymentAmountPerRepaymentCycle[0] =loanOutstandingBalanceAtTheEndOTheIntroductoryTerm[0]/pvUnderTheOngoingInterestRateAndTerm[0];
        remainingTermRepaymentAmountPerRepaymentCycle[1] =loanOutstandingBalanceAtTheEndOTheIntroductoryTerm[1]/pvUnderTheOngoingInterestRateAndTerm[1];



        for(j=0; j<361; j++){
          //loan term

        }
        for(i=0; i<361; i++){
          //loan term
          if((loanTerm[i]+1) > $scope.loanTermYear*12 ){
            loanTerm[i+1] = "";
          }else{
            loanTerm[i+1] =  loanTerm[i]+1;
          }

          //LoanOutstandingAtTheBeginningLoan1
          if(i == 0){
            if(loanTerm[i]>($scope.loanTermYear*monthlyReypayment-1)){
              LoanOutstandingAtTheBeginningLoan1[i] = "";
            }else{
              LoanOutstandingAtTheBeginningLoan1[i] = loanAmount;
            }
          }else{
            if(loanTerm[i]>($scope.loanTermYear*monthlyReypayment)){
              LoanOutstandingAtTheBeginningLoan1[i] = ""
            }else{
              LoanOutstandingAtTheBeginningLoan1[i] = loanOutstandingBalanceAtTheEndLoan1[i-1];

            }
          }
          /************************Interest Repayment loan 1******************************/
          //InterestRepaymentLoan1 (c)

         


          if(loanTerm[i] > ($scope.loanTermYear*monthlyReypayment-1)){
            InterestRepaymentLoan1[i] = "";

          }else{

            if($scope.DoesThisLoanHasAnIntroductoryRateLoan1=="No"){

              InterestRepaymentLoan1[i] = LoanOutstandingAtTheBeginningLoan1[i]*EffectiveRepaymentCycleRateLoan1[1];
            }else{

              if(loanTerm[i]<=$scope.IntroductoryTerm1*12){
                InterestRepaymentLoan1[i] = EffectiveRepaymentCycleRateLoan1[0]*LoanOutstandingAtTheBeginningLoan1[i]; //note B31
              }else{
                InterestRepaymentLoan1[i] = EffectiveRepaymentCycleRateLoan1[1]*LoanOutstandingAtTheBeginningLoan1[i]; ////note B31
              }
            }
          }

          /************************Principal Repayment loan1******************************/


          if(loanTerm[i] > ($scope.loanTermYear*monthlyReypayment-1)){
            PrincipalRepayment[i] = "";
          }else{
              if($scope.DoesThisLoanHasAnIntroductoryRateLoan1 == "No"){
                PrincipalRepayment[i]  = remainingTermRepaymentAmountPerRepaymentCycle[0]-InterestRepaymentLoan1[i]
              }else{

                  if(loanTerm[i]<=$scope.introductoryTerm2*12){
                    PrincipalRepayment[i] = IntroductoryPeriodRepaymentAmountPerRepaymentCycle[0]-InterestRepaymentLoan1[i];
                  }else{
                    PrincipalRepayment[i] = remainingTermRepaymentAmountPerRepaymentCycle[0]-InterestRepaymentLoan1[i];
                  }

              }
          }

          /**************************** Account Fee loan1***********************************/
        

          if(loanTerm[i]>$scope.loanTermYearmonthlyReypayment*monthlyReypayment-1){
            accountFeeLoan1[i] = "";
          }else{
            if(loanTerm[i]==0){
              accountFeeLoan1[i] = upfrontFees1+ongoingFees1
            }else{
              accountFeeLoan1[i] = ongoingFees1
            }
          }

          /***************loan Outstanding Balance At The End Loan1********/
        

          if(loanTerm[i]>$scope.loanTermYear*monthlyReypayment-1){
            loanOutstandingBalanceAtTheEndLoan1[i] = "";
          }else{
            loanOutstandingBalanceAtTheEndLoan1[i] = LoanOutstandingAtTheBeginningLoan1[i]-PrincipalRepayment[i];
          }









        }
        loanTerm.pop();
















        console.log("monthlyReypayment ==> ", monthlyReypayment);
        console.log("$scope.loanTermYear==> ", $scope.loanTermYear)
         console.log("loanTerm  ==> ", loanTerm);
         console.log("EffectiveRepaymentCycleRateLoan1==> ", EffectiveRepaymentCycleRateLoan1)
          console.log("EffectiveRepaymentCycleRateLoan2 ==>  ",EffectiveRepaymentCycleRateLoan2)
          console.log(  "pvUnderTheIntroductoryTerm ==>",   pvUnderTheIntroductoryTerm)
          console.log("IntroductoryPeriodRepaymentAmountPerRepaymentCycle ==>", IntroductoryPeriodRepaymentAmountPerRepaymentCycle)
          console.log("loanOutstandingBalanceAtTheEndOTheIntroductoryTerm ==>", loanOutstandingBalanceAtTheEndOTheIntroductoryTerm);
          console.log("pvUnderTheOngoingInterestRateAndTerm ==> ", pvUnderTheOngoingInterestRateAndTerm)
          console.log("remainingTermRepaymentAmountPerRepaymentCycle ==> ", remainingTermRepaymentAmountPerRepaymentCycle)
          console.log("===================================main row start here================================");
           console.log("LoanOutstandingAtTheBeginningLoan1 ==> ", LoanOutstandingAtTheBeginningLoan1)
           console.log("InterestRepaymentLoan1 ==> ", InterestRepaymentLoan1)
           console.log("PrincipalRepayment ==>  ", PrincipalRepayment);
           console.log("accountFeeLoan1 ==>  ", accountFeeLoan1)
           console.log("loanOutstandingBalanceAtTheEndLoan1 ==> ", loanOutstandingBalanceAtTheEndLoan1)

         LineChartService.createChart($scope.outputYear,$scope.cashOutflow, $scope.surplus);
      }else {
            $("#myModal").modal('show');
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }



      }

    $scope.calculateFinal(true, false, false);


    document.getElementById("download").addEventListener("click", function() {
        if ($scope.forms.ttrForm.$valid) {
            var normalDetails = {
                firstName: $scope.personalDetails.firstName,
                lastName: $scope.personalDetails.lastName,
                email: $scope.personalDetails.email,
                mobile: $scope.personalDetails.mobile,
                postalCode: $scope.personalDetails.postalCode,
                initialInvestmentAmount: Number($scope.initialInvestmentAmount.replaceAll('$', '').replaceAll(',', '')),
            }

            PdfMaker.createChart(normalDetails);
        } else {
            $("#myModal").modal('show');
        }
    });


}]);
