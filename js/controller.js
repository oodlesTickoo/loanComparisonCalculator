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

    /***************************************************************************************************
          added for calender and validation
    ****************************************************************************************************/
    var initDate = new Date();
  initDate.setYear(1989);
  initDate.setMonth(6);
  initDate.setDate(1);
  $scope.dob = initDate;
  $scope.firstDP = function() {
      $scope.dateOptions.maxDate = new Date(1998, 11, 31);
      $scope.dateOptions.minDate = new Date(1950, 0, 1);
      console.log("firstDp", $scope.dateOptions.minDate);
  }

  $scope.secondDp = function() {
      delete $scope.dateOptions.maxDate;
  }

  $scope.today = function() {
      $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function() {
      $scope.dt = null;
  };

  $scope.inlineOptions = {
      customClass: getDayClass,
      showWeeks: true
  };

  $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1,
      showWeeks: false
  };

  $scope.open1 = function() {
      $scope.popup1.opened = true;
      $scope.firstDP();
  };

  $scope.open2 = function() {
      $scope.secondDp();
      $scope.popup2.opened = true;
  };

  $scope.setDate = function(year, month, day) {
      $scope.dt = new Date(year, month, day);
  };

  $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate', 'dd/MM/yyyy', 'd!/M!/yyyy'];
  $scope.format = $scope.formats[5];

  $scope.popup1 = {
      opened: false
  };

  $scope.popup2 = {
      opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [{
      date: tomorrow,
      status: 'full'
  }, {
      date: afterTomorrow,
      status: 'partially'
  }];

  function getDayClass(data) {
      var date = data.date,
          mode = data.mode;
      if (mode === 'day') {
          var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

          for (var i = 0; i < $scope.events.length; i++) {
              var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

              if (dayToCheck === currentDay) {
                  return $scope.events[i].status;
              }
          }
      }

      return '';
  }
  var dt = new Date();

  $scope.fy = dt.getMonth() > 5 ? dt.getFullYear() : dt.getFullYear() - 1;

  $scope.age = AgeCalculator.getAge($scope.dob, $scope.fy);

  $scope.ageChange = function() {
        var dobText = document.getElementById("dobText");
        // console.log("dobText",new Date(dobText.value));
        var dateString = dobText.value;
        var dateArr = dateString.split("/");

        var date_regex = /^([1-9]|0[1-9]|1\d|2\d|3[01])\/(0[1-9]|[1-9]|1[0-2])\/(19[5-9][0-9])$/;
        var correct = date_regex.test(dobText.value);
        var fd = new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);

        if (((fd.getMonth() + 1) === Number(dateArr[1]) && fd.getDate() === Number(dateArr[0])) && correct) {
            $scope.dob = fd;
        } else {
            $scope.dob = initDate;
        }
        $scope.age = AgeCalculator.getAge($scope.dob, $scope.fy);
        // calculateFinal();


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
    $scope.IntroductoryRate1 = 4.50,
    $scope.totalFeesValueLoan1 = 0,
    $scope.totalFeesValueLoan2 = 0,
    $scope.totalInterestValueLoan1 = 0,
    $scope.totalInterestValueLoan2 = 0,
    $scope.totalPrincipalValueLoan1 = 0,
    $scope.totalPrincipalValueLoan2 = 0,
    $scope.totalRepaymentValueLoan1 = 0,
    $scope.totalRepaymentValueLoan2 = 0;




    $scope.genderMmbr2 = true;
    var pvUnderTheIntroductoryTerm = [];

    //all blank value array
    $scope.year = [],


    $scope.moreLoanOption = true;
    $scope.repaymentCycleLoan1 = "Fortnightly";
    $scope.repaymentCycleLoan2 = "Fortnightly";

    $scope.getGenderOfMember2 = function(getGender){
      $scope.genderMmbr2 = getGender;
    }

    $scope.Weekly1 = false;
    $scope.Fortnightly1 = true;
    $scope.Monthly1 = false;

    $scope.checkPaymentCycle1 = function(getPaymentCycle){
      switch (getPaymentCycle) {
        case "Weekly":
          $scope.Weekly1 = true;
          $scope.Fortnightly1 = false;
          $scope.Monthly1 = false;
        break;
        case "Fortnightly":
          $scope.Weekly1 = false;
          $scope.Fortnightly1 = true;
          $scope.Monthly1 = false;
        break;
        case "Monthly":
          $scope.Weekly1 = false;
          $scope.Fortnightly1 = false;
          $scope.Monthly1 = true;
        break;
      }
      $scope.repaymentCycleLoan1 = getPaymentCycle;
      console.log("first",$scope.repaymentCycleLoan1)
    }


    $scope.Weekly2 = false;
    $scope.Fortnightly2 = true;
    $scope.Monthly2 = false;

    $scope.checkPaymentCycle2 = function(getPaymentCycle2){
      switch (getPaymentCycle2) {
        case "Weekly":
          $scope.Weekly2 = true;
          $scope.Fortnightly2 = false;
          $scope.Monthly2 = false;
        break;
        case "Fortnightly":
          $scope.Weekly2 = false;
          $scope.Fortnightly2 = true;
          $scope.Monthly2= false;
        break;
        case "Monthly":
          $scope.Weekly2 = false;
          $scope.Fortnightly2 = false;
          $scope.Monthly2 = true;
        break;
      }
      $scope.repaymentCycleLoan2 = getPaymentCycle2;
      console.log("second", $scope.repaymentCycleLoan2)
    }







    console.log(pvUnderTheIntroductoryTerm)


    //Mapping-Frequency per month-Repayment Cycle
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
    function reypaymentValue(mapping){

    var getMapping = -1;

    for(i=0; i<mappingFrequencyRepayment.length; i++){

      if(mappingFrequencyRepayment[i].mapping == mapping){
          getMapping = i;
          break;
      }
    }
    return mappingFrequencyRepayment[getMapping].repayment;

  }
  console.log(mappingFrequencyRepayment)
  function frequencyPerMonth(mapping){
    //console.log(mapping);
    var intial = -1;
    for(k=0; k<mappingFrequencyRepayment.length; k++){
      //console.log(mappingFrequencyRepayment[k].mapping)
      if(mappingFrequencyRepayment[k].mapping == mapping){
          intial = k;
          break;
      }


     }

     return mappingFrequencyRepayment[intial].frequency;
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
        loanOutstandingBalanceAtTheEndLoan1 = [],
        loanTermLoan2 = [],
        LoanOutstandingAtTheBeginningLoan2 = [],
        InterestRepaymentLoan2 = [],
        PrincipalRepaymentLoan2 = [],
        accountFeeLoan2 = [],
        loanOutstandingBalanceAtTheEndLoan2 = [],
        repaymentPerPaymentCycleDuringIntrodutoryPeriod = [],
        RepaymentPerPaymentCycleDuringOrdinaryPeriod = [],
        totalFees = [0,0],
        totalInterest = [0,0],
        totalPrincipal = [0,0],
        totalRepayment = [0,0],
        totalRepaymentLoan1 = [],
        totalRepaymentLoan2 = [];

      $scope.yesNoQuestion1 = false;
      $scope.yesNoQuestion2 = false;


      $scope.yesNoReply1 = function(getReply){

        if(getReply){
          $scope.DoesThisLoanHasAnIntroductoryRateLoan1 = "Yes";
        }else{
          $scope.DoesThisLoanHasAnIntroductoryRateLoan1 = "No";
        }
        $scope.yesNoQuestion1 = getReply;
        //console.log("first",$scope.DoesThisLoanHasAnIntroductoryRateLoan1)
      }

      $scope.yesNoReply2 = function(getReply2){
        if(getReply2){
          $scope.DoesThisLoanHasAnIntroductoryRateLoan2 = "Yes";
        }else{
          $scope.DoesThisLoanHasAnIntroductoryRateLoan2 = "No";
        }
        $scope.yesNoQuestion2 = getReply2;
        //console.log("second",$scope.DoesThisLoanHasAnIntroductoryRateLoan2)
      }

      $scope.personalDetails = {
        firstName: "Dexter",
        lastName: "Payne",
        email: "dexter@gmail.com",
        mobile: 412121212,
        postalCode: 1234
    };



    $scope.calculate=function(isValid){

      console.log('working');

      if (isValid) {
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


        EffectiveRepaymentCycleRateLoan1[0] = Math.pow(1+IntroductoryRate1/100 ,1/monthlyReypayment) - 1;
        EffectiveRepaymentCycleRateLoan1[1] = Math.pow(1+ongoingRate1/100 ,1/monthlyReypayment)-1 ;
        EffectiveRepaymentCycleRateLoan2[0] = Math.pow(1+IntroductoryRate2/100 ,1/monthlyReypayment)-1 ;
        EffectiveRepaymentCycleRateLoan2[1] = Math.pow(1+ongoingRate2/100 ,1/monthlyReypayment)-1 ;

        //PV under the introductory term

        if($scope.DoesThisLoanHasAnIntroductoryRateLoan1 == "Yes"){
          pvUnderTheIntroductoryTerm[0] = Math.abs(PV(EffectiveRepaymentCycleRateLoan1[0],$scope.loanTermYear*monthlyReypayment,1,0,0))  //
        }else{
          pvUnderTheIntroductoryTerm[0] = Math.abs(PV(EffectiveRepaymentCycleRateLoan1[1],$scope.loanTermYear*monthlyReypayment,1,0,0))
        }
        //IF(C8="Yes",ABS(PV(H9,$B$4*$C$3,1,0,0)),ABS(PV(H13,$B$4*$C$3,1,0,0)))
        if($scope.DoesThisLoanHasAnIntroductoryRateLoan2=="Yes"){
          pvUnderTheIntroductoryTerm[1] = Math.abs(PV(EffectiveRepaymentCycleRateLoan2[0],$scope.loanTermYear*monthlyReypayment,1,0,0))
        }else{
          pvUnderTheIntroductoryTerm[1] = Math.abs(PV(EffectiveRepaymentCycleRateLoan2[1],$scope.loanTermYear*monthlyReypayment,1,0,0));
        }

        //Introductory period repayment amount per repayment cycle (exclude fees)


        IntroductoryPeriodRepaymentAmountPerRepaymentCycle[0] = loanAmount/pvUnderTheIntroductoryTerm[0]
        IntroductoryPeriodRepaymentAmountPerRepaymentCycle[1] = loanAmount/pvUnderTheIntroductoryTerm[1]

        //Loan outstanding balance at the end of the introductory term
        //loanOutstandingBalanceAtTheEndOTheIntroductoryTerm[0] = //$B$2-IF(B8="Yes",-PV(G9,$C$3*B10,B21,0,0),-PV(G13,$C$3*B10,B21,0,0))
        //loanOutstandingBalanceAtTheEndOTheIntroductoryTerm[1] = =$B$2-IF(C8="Yes",-PV(H9,$C$3*C10,C21,0,0),-PV(H13,$C$3*C10,C21,0,0))

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
        //pvUnderTheOngoingInterestRateAndTerm[0] =-PV(G13,($B$4-B10)*$C$3,1,0,0)
        //pvUnderTheOngoingInterestRateAndTerm[1] = =-PV(H13,($B$4-C10)*$C$3,1,0,0)
        pvUnderTheOngoingInterestRateAndTerm[0] =-PV(EffectiveRepaymentCycleRateLoan1[1],($scope.loanTermYear-$scope.IntroductoryTerm1)*monthlyReypayment,1,0,0)
        pvUnderTheOngoingInterestRateAndTerm[1] = -PV(EffectiveRepaymentCycleRateLoan2[1],($scope.loanTermYear-$scope.IntroductoryTerm1)*monthlyReypayment,1,0,0)

        //Remaining term repayment amount per repayment cycle (exclude fees)
        //remainingTermRepaymentAmountPerRepaymentCycle[0] =B22/B23
        //remainingTermRepaymentAmountPerRepaymentCycle[1] =C22/C23

        remainingTermRepaymentAmountPerRepaymentCycle[0] =loanOutstandingBalanceAtTheEndOTheIntroductoryTerm[0]/pvUnderTheOngoingInterestRateAndTerm[0];
        remainingTermRepaymentAmountPerRepaymentCycle[1] =loanOutstandingBalanceAtTheEndOTheIntroductoryTerm[1]/pvUnderTheOngoingInterestRateAndTerm[1];

        /*****Repayment per payment cycle during Introdutory period*****/

        if($scope.DoesThisLoanHasAnIntroductoryRateLoan1 =="Yes"){
            repaymentPerPaymentCycleDuringIntrodutoryPeriod[0] = IntroductoryPeriodRepaymentAmountPerRepaymentCycle[0]/frequencyPerMonth($scope.repaymentCycleLoan1);
        }else{
          repaymentPerPaymentCycleDuringIntrodutoryPeriod[0] = 0;
        }


        if($scope.DoesThisLoanHasAnIntroductoryRateLoan2=="Yes"){
          repaymentPerPaymentCycleDuringIntrodutoryPeriod[1] = IntroductoryPeriodRepaymentAmountPerRepaymentCycle[1]/frequencyPerMonth($scope.repaymentCycleLoan2);
        }else{
          repaymentPerPaymentCycleDuringIntrodutoryPeriod[1] = 0;
        }

        /*************Repayment per payment cycle during ordinary period***/
        RepaymentPerPaymentCycleDuringOrdinaryPeriod[0] = remainingTermRepaymentAmountPerRepaymentCycle[0]/frequencyPerMonth($scope.repaymentCycleLoan1);
        RepaymentPerPaymentCycleDuringOrdinaryPeriod[1] = remainingTermRepaymentAmountPerRepaymentCycle[1]/frequencyPerMonth($scope.repaymentCycleLoan2);




        for(j=0; j<361; j++){
          //loan term

        }
        for(i=0; i<360; i++){

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

          //=IFERROR(IF(A30>$B$4*$C$3-1,"",IF($B$8="No",B30*$G$13,IF(A30<=$B$10*12,$G$9,$G$13)*B30)),"")
          //=IFERROR(IF(A31>$B$4*$C$3-1,"",IF($B$8="No",B31*$G$13,IF(A31<=$B$10*12,$G$9,$G$13)*B31)),"")
          //=IFERROR(IF(A32>$B$4*$C$3-1,"",IF($B$8="No",B32*$G$13,IF(A32<=$B$10*12,$G$9,$G$13)*B32)),"")
          //IF(A31>$B$4*$C$3-1,    ""   ,   IF($B$8="No",B31*$G$13,IF(A31<=$B$10*12,$G$9,$G$13)*B31)       )


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
          //=IFERROR(IF(A30>$B$4*$C$3-1,"",IF($B$8="No",$B$24,IF(A30<=$B$10*12,$B$21,$B$24))-C30),"")
          //=IFERROR(IF(A31>$B$4*$C$3-1,"",IF($B$8="No",$B$24,IF(A31<=$B$10*12,$B$21,$B$24))-C31),"")
          //=IFERROR(IF(A32>$B$4*$C$3-1,"",IF($B$8="No",$B$24,IF(A32<=$B$10*12,$B$21,$B$24))-C32),"")

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
          //=IFERROR(IF(A30>$B$4*$C$3-1,"",IF(A30=0,$B$12+$B$14,$B$14)),"")
          //=IFERROR(IF(A31>$B$4*$C$3-1,"",IF(A31=0,$B$12+$B$14,$B$14)),"")
          //=IFERROR(IF(A32>$B$4*$C$3-1,"",IF(A32=0,$B$12+$B$14,$B$14)),"")
          //accountFeeLoan1

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
          //loanOutstandingBalanceAtTheEndLoan1
          //=IF(A30>$B$4*$C$3-1,"",B30-D30)
          //=IF(A31>$B$4*$C$3-1,"",B31-D31)
          //=IF(A32>$B$4*$C$3-1,"",B32-D32)
          //=IF(A33>$B$4*$C$3-1,"",B33-D33)

          if(loanTerm[i]>$scope.loanTermYear*monthlyReypayment-1){
            loanOutstandingBalanceAtTheEndLoan1[i] = "";
          }else{
            loanOutstandingBalanceAtTheEndLoan1[i] = LoanOutstandingAtTheBeginningLoan1[i]-PrincipalRepayment[i];
          }


          /**********************
          loan 2 start here

          loanTermLoan2 = [],
          LoanOutstandingAtTheBeginningLoan2 = [],
          InterestRepaymentLoan2 = [],
          PrincipalRepaymentLoan2 = [],
          accountFeeLoan2 = [],
          loanOutstandingBalanceAtTheEndLoan2 = [];
          *****************************/
          /****loanTermLoan2****/
          //=IFERROR(IF(H30+1>$B$4*12,"",H30+1),"")
          //=IFERROR(IF(H31+1>$B$4*12,"",H31+1),"")

          if(i==0){
            loanTermLoan2[i] = 0;
          }else{

            if(loanTermLoan2[i-1]+1>$scope.loanTermYear*12){
              loanTermLoan2[i] = "";
            }else{
              loanTermLoan2[i] = loanTermLoan2[i-1]+1;
            }

          }

          /*******************Loan Outstanding At TheBeginning Loan2********************/
          //LoanOutstandingAtTheBeginningLoan2
          //=IFERROR(IF(H30>$B$4*$C$3-1,"",B2),"") [0]
          //=IF(H31>$B$4*$C$3,"",M30)
          //=IF(H32>$B$4*$C$3,"",M31)
          //=IF(H33>$B$4*$C$3,"",M32)
          if(i == 0){
             if(loanTermLoan2[i]>$scope.loanTermYear*monthlyReypayment-1){
               LoanOutstandingAtTheBeginningLoan2[i] = "";
             }else{
               LoanOutstandingAtTheBeginningLoan2[i] = loanAmount;
             }
          }else{
            if(loanTermLoan2[i]>$scope.loanTermYear*monthlyReypayment){
              LoanOutstandingAtTheBeginningLoan2[i] = "";
            }else{
              LoanOutstandingAtTheBeginningLoan2[i] = loanOutstandingBalanceAtTheEndLoan2[i-1];
            }
          }
          /*******************Interest Repayment Loan2 ********************/
          //=IFERROR(IF(H30>$B$4*$C$3-1,"",IF($C$8="No",I30*$H$13,IF(H30<=$C$10*12,$H$9,$H$13)*I30)),"")
          //=IFERROR(IF(H31>$B$4*$C$3-1,"",IF($C$8="No",I31*$H$13,IF(H31<=$C$10*12,$H$9,$H$13)*I31)),"")
          //=IFERROR(IF(H32>$B$4*$C$3-1,"",IF($C$8="No",I32*$H$13,IF(H32<=$C$10*12,$H$9,$H$13)*I32)),"")
          //=IFERROR(IF(H33>$B$4*$C$3-1,"",IF($C$8="No",I33*$H$13,IF(H33<=$C$10*12,$H$9,$H$13)*I33)),"")

            if(loanTermLoan2[i]>$scope.loanTermYear*monthlyReypayment-1){
              InterestRepaymentLoan2[i] = "";
            }else{
              if($scope.DoesThisLoanHasAnIntroductoryRateLoan2=="No"){
                InterestRepaymentLoan2[i] = LoanOutstandingAtTheBeginningLoan2[i]*EffectiveRepaymentCycleRateLoan2[1];
              }else{
                if(loanTermLoan2[i]<=$scope.introductoryTerm2*12){
                  InterestRepaymentLoan2[i] = EffectiveRepaymentCycleRateLoan2[0]*LoanOutstandingAtTheBeginningLoan2[i];
                }else{
                  InterestRepaymentLoan2[i] = EffectiveRepaymentCycleRateLoan2[1]*LoanOutstandingAtTheBeginningLoan2[i];
                }
              }
            }

            /*******************Principal Repayment Loan2 ********************/
            //PrincipalRepaymentLoan2
            //=IFERROR(IF(H30>$B$4*$C$3-1,"",IF($C$8="No",$C$24,IF(H30<=$B$10*12,$C$21,$C$24))-J30),"")
            //=IFERROR(IF(H31>$B$4*$C$3-1,"",IF($C$8="No",$C$24,IF(H31<=$B$10*12,$C$21,$C$24))-J31),"")
            //=IFERROR(IF(H32>$B$4*$C$3-1,"",IF($C$8="No",$C$24,IF(H32<=$B$10*12,$C$21,$C$24))-J32),"")



            if(loanTermLoan2[i]>$scope.loanTermYear*monthlyReypayment-1){
              PrincipalRepaymentLoan2[i] = "";
            }else{
              if($scope.DoesThisLoanHasAnIntroductoryRateLoan2=="No"){
                PrincipalRepaymentLoan2[i] = remainingTermRepaymentAmountPerRepaymentCycle[1]-InterestRepaymentLoan2[i]
              }else{
                if(loanTermLoan2[i]<=$scope.IntroductoryTerm1*12){
                    PrincipalRepaymentLoan2[i] = IntroductoryPeriodRepaymentAmountPerRepaymentCycle[1]-InterestRepaymentLoan2[i]
                }else{
                  PrincipalRepaymentLoan2[i] = remainingTermRepaymentAmountPerRepaymentCycle[1]-InterestRepaymentLoan2[i]
                }
              }
            }

            /********************Account Fee loan 2**************/
            //accountFeeLoan2
            //=IFERROR(IF(H30>$B$4*$C$3-1,"",IF(H30=0,$C$12+$C$14,$C$14)),"")
            //=IFERROR(IF(H31>$B$4*$C$3-1,"",IF(H31=0,$C$12+$C$14,$C$14)),"")
            //=IFERROR(IF(H32>$B$4*$C$3-1,"",IF(H32=0,$C$12+$C$14,$C$14)),"")

          if(loanTermLoan2[i]>$scope.loanTermYear*monthlyReypayment-1){
            accountFeeLoan2[i] = "";
          }else{
            if(loanTermLoan2[i]==0){
              accountFeeLoan2[i] = upfrontFeesInpu2+ongoingFees2
            }else{
              accountFeeLoan2[i] = ongoingFees2
            }
          }
          /********************Loan outstanding balance at the end**********************/
          //loanOutstandingBalanceAtTheEndLoan2
          //=IF(H30>$B$4*$C$3-1,"",I30-K30)
          //=IF(H31>$B$4*$C$3-1,"",I31-K31)
          //=IF(H32>$B$4*$C$3-1,"",I32-K32)
          if(loanTermLoan2[i]>$scope.loanTermYear*monthlyReypayment-1){
            loanOutstandingBalanceAtTheEndLoan2[i] = "";
          }else{
            loanOutstandingBalanceAtTheEndLoan2[i] = LoanOutstandingAtTheBeginningLoan2[i]-PrincipalRepaymentLoan2[i];
          }


          /*****************Total fees , total interest , total principal*********************/
          totalFees[0] += accountFeeLoan1[i];
          totalFees[1] += accountFeeLoan2[i];
          totalInterest[0] +=InterestRepaymentLoan1[i];
          totalInterest[1] +=InterestRepaymentLoan2[i];
          totalPrincipal[0] += PrincipalRepayment[i];
          totalPrincipal[1] += PrincipalRepaymentLoan2[i];




          /*********************Total repayment loan1********************/
          //=$C$10-SUM($Calculation.C29:E29)
          //=I5-SUM($Calculation.C30:E30)
          //=I6-SUM($Calculation.C31:E31)
          //=I7-SUM($Calculation.C32:E32)
          //totalRepaymentLoan1 =

          if(i==0){
            totalRepaymentLoan1[i] = totalRepayment[i]-(InterestRepaymentLoan1[0]+PrincipalRepayment[0]+accountFeeLoan1[0])//SUM($Calculation.C29:E29);
          }else{
            totalRepaymentLoan1[i] = "yo"//I5[i]-SUM($Calculation.C30[i]:E30[i])
          }













        }
        //loop end here

        //totalRepayment
        totalRepayment[0] = totalFees[0]+totalInterest[0]+totalPrincipal[0];
        totalRepayment[1] = totalFees[1]+totalInterest[1]+totalPrincipal[1];


        $scope.totalFeesValueLoan1 = totalFees[0];
        $scope.totalFeesValueLoan2 = totalFees[1];
        $scope.totalInterestValueLoan1 = totalInterest[0];
        $scope.totalInterestValueLoan2 = totalInterest[1];
        $scope.totalPrincipalValueLoan1 = totalPrincipal[0];
        $scope.totalPrincipalValueLoan2 = totalPrincipal[1];
        $scope.totalRepaymentValueLoan1 = totalRepayment[0];
        $scope.totalRepaymentValueLoan2 = totalRepayment[1];









        console.log("monthlyReypayment ==> ", monthlyReypayment);
        console.log("$scope.loanTermYear==> ", $scope.loanTermYear)

         console.log("EffectiveRepaymentCycleRateLoan1==> ", EffectiveRepaymentCycleRateLoan1)
          console.log("EffectiveRepaymentCycleRateLoan2 ==>  ",EffectiveRepaymentCycleRateLoan2)
          console.log(  "pvUnderTheIntroductoryTerm ==>",   pvUnderTheIntroductoryTerm)
          console.log("IntroductoryPeriodRepaymentAmountPerRepaymentCycle ==>", IntroductoryPeriodRepaymentAmountPerRepaymentCycle)
          console.log("loanOutstandingBalanceAtTheEndOTheIntroductoryTerm ==>", loanOutstandingBalanceAtTheEndOTheIntroductoryTerm);
          console.log("pvUnderTheOngoingInterestRateAndTerm ==> ", pvUnderTheOngoingInterestRateAndTerm)
          console.log("remainingTermRepaymentAmountPerRepaymentCycle ==> ", remainingTermRepaymentAmountPerRepaymentCycle)
          console.log("===================================colomn for loan 1================================");
          console.log("loanTerm  ==> ", loanTerm);
           console.log("LoanOutstandingAtTheBeginningLoan1 ==> ", LoanOutstandingAtTheBeginningLoan1)
           console.log("InterestRepaymentLoan1 ==> ", InterestRepaymentLoan1)
           console.log("PrincipalRepayment ==>  ", PrincipalRepayment);
           console.log("accountFeeLoan1 ==>  ", accountFeeLoan1)
           console.log("loanOutstandingBalanceAtTheEndLoan1 ==> ", loanOutstandingBalanceAtTheEndLoan1)
           console.log("===================================colomn for loan 2================================");
          console.log("loanTermLoan2  ==> ", loanTermLoan2);
          console.log("LoanOutstandingAtTheBeginningLoan2 ==> ", LoanOutstandingAtTheBeginningLoan2)
           console.log("InterestRepaymentLoan2 ==> ", InterestRepaymentLoan2)
           console.log("PrincipalRepaymentLoan2 ==>  ", PrincipalRepaymentLoan2);
           console.log("accountFeeLoan2 ==>  ", accountFeeLoan2)
           console.log("loanOutstandingBalanceAtTheEndLoan2 ==> ", loanOutstandingBalanceAtTheEndLoan2)
           console.log("===================================comparision page ================================");
          console.log("repaymentPerPaymentCycleDuringIntrodutoryPeriod ==> ", repaymentPerPaymentCycleDuringIntrodutoryPeriod)
          console.log("RepaymentPerPaymentCycleDuringOrdinaryPeriod ==> ", RepaymentPerPaymentCycleDuringOrdinaryPeriod)
          console.log("totalFees ==>   ", totalFees)
          console.log("totalInterest ==>  ", totalInterest)
          console.log("totalPrincipal ===>  ", totalPrincipal)
          console.log("totalRepayment ==>  ", totalRepayment)
          console.log("totalRepaymentLoan1 ==> ", totalRepaymentLoan1);
          //console.log("totalRepaymentLoan2 ==> ", totalRepaymentLoan2)

         LineChartService.createChart(totalPrincipal, totalInterest, [0,2,4,6,8]);
      }else {
        //alert('else')
            $("#myModal").modal('show');
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }



      }

    $scope.calculate(true);

    //download button click
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
    //print section

    $(".print-doc").on("click", printAllCharts);

    function printAllCharts() {

        if ($scope.forms.ttrForm.$valid) {

            var printUpdate = function() {
                $('#container').highcharts().reflow();
            };


              document.getElementById("container").style.display = "block";
              //document.getElementById("containerB").style.display = "block";

              if (window.matchMedia) {
                  var mediaQueryList = window.matchMedia('print');
                  mediaQueryList.addListener(function(mql) {
                      printUpdate();
                  });
              }
              window.print();


        } else {
            $("#myModal").modal('show');
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }
    };


}]);
