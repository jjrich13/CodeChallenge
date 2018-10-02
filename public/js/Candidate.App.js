const app = angular.module("Candidate.App", ['ngMaterial', 'ngMessages']);

app.component("itmRoot", {
    controller: class {
        constructor() {
            this.candidates = [
                { name: "Puppies", imgUrl: "https://cdn1-www.dogtime.com/assets/uploads/2010/12/puppies.jpg", votes: 10 },
                { name: "Kittens", imgUrl: "http://r.ddmcdn.com/w_606/s_f/o_1/cx_0/cy_15/cw_606/ch_404/APL/uploads/2014/06/10-kitten-cuteness-1.jpg", votes: 12 }, 
                { name: "Gerbils", imgUrl: "https://a-z-animals.com/media/animals/images/original/gerbil4.jpg", votes: 7 }
            ];
            this.totalVotes = function () {
                let total = 0;
                for (let i = 0; i < this.candidates.length; i++) {
                    total += this.candidates[i].votes;


                }
                return total
            }
        }

        onVote(candidate) {
            console.log(`Vote for ${candidate.name}`);
            let indexOfCandidateToVoteFor = this.candidates.indexOf(candidate);
            this.candidates[indexOfCandidateToVoteFor].votes++;

        }

        onAddCandidate(candidate) {
            //declare variable to indicate duplicated names
            let duplicate = false;
            //check for blank inputs, if so, alert user and exit function
            if (candidate.name === ''|| candidate.imgUrl === '') {
                alert('Make sure you fill in both fields')
                return false;
            }
            //check for duplicated names
            this.candidates.forEach(specificCandidate => {
                if (specificCandidate.name.toLowerCase() === candidate.name.toLowerCase()) {
                    alert('A candidate with that name already exists. Enter a new name.')
                    duplicate = true
                }
            })
            //if the name is not duplicated, add the new candidate
            if (!duplicate) {
                this.candidates.push({ name: candidate.name, imgUrl: candidate.imgUrl, votes: 0 });
            }
            console.log(`Added candidate ${candidate.name}`);
        }

        onRemoveCandidate(candidate) {
            console.log(`Removed candidate ${candidate.name}`);
            let indexOfCandidateToDelete = this.candidates.indexOf(candidate);
            this.candidates.splice(indexOfCandidateToDelete, 1);

        }
    },
    template: `
        <h1>Which candidate brings the most joy?</h1>
            
        <itm-results 
            candidates="$ctrl.candidates"
            total-votes="$ctrl.totalVotes"
            teststring="$ctrl.testString">
        </itm-results>

        <itm-vote 
            candidates="$ctrl.candidates"
            on-vote="$ctrl.onVote($candidate)">
        </itm-vote>

        <itm-management 
            candidates="$ctrl.candidates"
            on-add="$ctrl.onAddCandidate($candidate)"
            on-remove="$ctrl.onRemoveCandidate($candidate)">
        </itm-management>
    `
});

app.component("itmManagement", {
    bindings: {
        candidates: "<",
        onAdd: "&",
        onRemove: "&"
    },
    controller: class {
        constructor() {
            this.newCandidate = {
                name: "",
                imgUrl: ""
            };
        }

        submitCandidate(candidate) {
            this.onAdd({ $candidate: candidate });
            //clear the inputs on submit
            this.newCandidate.name = '';
            this.newCandidate.imgURL = '';
        }

        removeCandidate(candidate) {
            this.onRemove({ $candidate: candidate });
        }
    },
    template: `
    
        <md-content>
            <h2>Manage Candidates</h2>

            <h3>Add New Candidate</h3>
            <form ng-submit="$ctrl.submitCandidate($ctrl.newCandidate)" novalidate>

                <md-input-container>
                    <label>Candidate Name</label>
                    <input type="text" ng-model="$ctrl.newCandidate.name" required>
                </md-input-container>
                <md-input-container>
                    <label>Image Url</label>
                    <input type="text" ng-model="$ctrl.newCandidate.imgUrl" required>
                </md-input-container>
                    <md-button type="submit">Add</md-button>
                
            </form>

            <h3>Remove Candidate</h3>
            <md-list class="list">
                <md-list-item ng-repeat="candidate in $ctrl.candidates">
                    <span ng-bind="candidate.name"></span>
                    <md-button class="md-fab md-secondary" type="button" ng-click="$ctrl.removeCandidate(candidate)"><md-icon> clear </md-icon></md-button>
                </md-list-item>
            </md-list>
        </md-content>
    `
});

app.component("itmVote", {
    bindings: {
        candidates: "<",
        onVote: "&"
    },
    controller: class { },
    template: `

    <md-content>
        <div class="voteSection">
            <h2>Cast your vote!</h2>

            
            <md-button class="md-raised" type="button"
                ng-repeat="candidate in $ctrl.candidates"
                ng-click="$ctrl.onVote({ $candidate: candidate })">
                <span ng-bind="candidate.name"></span><md-icon> how_to_vote </md-icon>
            </md-button>
        </div>
    </md-content>
    `
});

app.component("itmResults", {
    bindings: {
        candidates: "<",
        totalVotes: "<"
    },
    controller: class { },
    template: `
        <h2>Live Results</h2>

        <md-content layout="row" layout-wrap>
                <md-card ng-repeat="candidate in $ctrl.candidates | orderBy: '-votes'">
                    <img ng-src={{candidate.imgUrl}}>
                    <md-card-content ng-bind="candidate.name"></md-card-content>
                    <md-card-content class="bold">{{(candidate.votes/$ctrl.totalVotes())*100 | number:1}}%</md-card-content>
                </md-card>
        <md-content>
    `
});
