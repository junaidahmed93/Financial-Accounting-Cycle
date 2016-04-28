var ref = new Firebase('https://accountingabc.firebaseio.com/');
var app = angular.module('starter');

app.controller('home', function ($scope) {
    console.log('home');
});

app.controller('dashboard', function ($scope) {
    console.log('dashboard');
    $scope.test = false;    
    $scope.entry = {};
    var clear = function(){
        $scope.entry.date = "";
        $scope.entry.debitTitle = "";
        $scope.entry.debitAmount = "";
        $scope.entry.creditTitle = "";
        $scope.entry.creditAmount = "";
    }
   
    $scope.add = function (entry) {
        console.log(entry);
        if (entry.debitTitle === undefined && entry.debitAmount === undefined) {
            console.log("first");
            ref.child('General-Journal').child(entry.date).child(entry.creditTitle).set({

                Credit: entry.creditAmount

            });
            ref.child('Ledger-Posting').child(entry.creditTitle).child(entry.date).set({ Credit: entry.creditAmount });
            clear();
        }
        else if (entry.creditTitle === undefined && entry.creditAmount === undefined) {
            console.log("second");
            ref.child('General-Journal').child(entry.date).child(entry.debitTitle).set({

                Debit: entry.debitAmount

            });
            ref.child('Ledger-Posting').child(entry.debitTitle).child(entry.date).set({ Debit: entry.debitAmount });
            clear();
        }
        else {
            console.log("third");
            ref.child('General-Journal').child(entry.date).child(entry.creditTitle).set({

                Credit: entry.creditAmount

            });
            ref.child('Ledger-Posting').child(entry.creditTitle).child(entry.date).set({ Credit: entry.creditAmount });

            ref.child('General-Journal').child(entry.date).child(entry.debitTitle).set({

                Debit: entry.debitAmount

            });
            ref.child('Ledger-Posting').child(entry.debitTitle).child(entry.date).set({ Debit: entry.debitAmount });
            clear();
        }



    }
    


});



////////////////

app.controller('generalentry', function ($scope) {
    console.log('generalentry');
     $scope.generalJournal = {};
    ref.child('General-Journal').on('value', function (snapshot) {
        console.log(snapshot.val());
        $scope.generalJournal = snapshot.val();

        $scope.$digest();
    })
})