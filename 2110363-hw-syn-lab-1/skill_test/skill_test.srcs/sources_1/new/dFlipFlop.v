`timescale 1ns / 1ps


module dFlipflop(
    output reg q,
    output reg notq,
    input d,
    input clk
    );
    
    reg state;
    initial state = 0;
    always @(posedge clk) state = d;
    always @(state) {q,notq} = {state,~state};
    
endmodule