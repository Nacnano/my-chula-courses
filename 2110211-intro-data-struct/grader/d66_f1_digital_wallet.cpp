#ifndef __STUDENT_H_
#define __STUDENT_H_

#include <string>
#include <unordered_map>
#include <queue>

// you can include anything

using namespace std;

class DigitalWallet {
  // you can declare variables or write new function

 public:
    unordered_map<string, queue<pair<int, int> > > wallets;
    queue<pair<int, pair<int, string> > > all_wallets;
    unordered_map<string, long long> used;
    unordered_map<string, int> moneyOf;
    long long total_give = 0, total_spent = 0, total_expired = 0;

  void add_money(size_t time, string person_id, int amount, size_t duration) {
    // your code here
    wallets[person_id].push({time + duration, amount});
    all_wallets.push({time + duration, {amount, person_id}});
    total_give += 1ll*amount;
    moneyOf[person_id] += amount;
  }

  bool use_money(size_t time, string person_id, int amount) {
    // your code here
    int total = current_money(time, person_id);
    if(total >= amount){
        total_spent += 1ll*amount;
        used[person_id] += 1ll*amount;
        while(amount){
            if(wallets[person_id].front().second > amount){
                wallets[person_id].front().second -= amount;
                moneyOf[person_id] -= amount;
                amount = 0;
            }
            else {
                amount -= wallets[person_id].front().second;
                moneyOf[person_id] -= wallets[person_id].front().second;
                wallets[person_id].pop();
            }
        }
        return true;
    }
    return false;
  }

  int current_money(size_t time, string person_id) {
    // your code here
    while(!wallets[person_id].empty()){
        if(wallets[person_id].front().first < time){
            moneyOf[person_id] -= wallets[person_id].front().second;
            wallets[person_id].pop();
        }
        else break;
    }
    return moneyOf[person_id];
  }

  void status(size_t time, long long &total_give, long long &total_spent,
              long long &total_expired) {
    // your code here
    while(!all_wallets.empty()){
        if(all_wallets.front().first < time){
            int amount = all_wallets.front().second.first;
            string person_id  = all_wallets.front().second.second;
            if(used[person_id] > amount){
                used[person_id] -= amount;
            }
            else {
                this->total_expired += 1ll*(amount - used[person_id]);
                used[person_id] = 0;
            }
            all_wallets.pop();
        }
        else break;
    }

    total_give = this->total_give;
    total_spent = this->total_spent;
    total_expired = this->total_expired;
  }
};

#endif
