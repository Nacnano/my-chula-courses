`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date: 09/16/2024 10:15:08 PM
// Design Name: 
// Module Name: system
// Project Name: 
// Target Devices: 
// Tool Versions: 
// Description: 
// 
// Dependencies: 
// 
// Revision:
// Revision 0.01 - File Created
// Additional Comments:
// 
//////////////////////////////////////////////////////////////////////////////////

module system(
    output [6:0] seg,
    output dp,
    output [3:0] an,
    input [7:0] sw,
    input btnU, 
    input btnC, 
    input btnD, 
    input btnL,
    input btnR,
    input clk
    );
    
    wire an0,an1,an2,an3;
    assign an={an3,an2,an1,an0};
    
    ////////////////////////////////////////
    // Clock
    wire targetClk;
    wire [18:0] tclk;
    
    assign tclk[0]=clk;
    
    genvar c;
    generate for(c=0;c<18;c=c+1) begin
        clockDiv fDiv(tclk[c+1],tclk[c]);
    end endgenerate
    
    clockDiv fdivTarget(targetClk,tclk[18]);
    
    ////////////////////////////////////////
    // Display
    quadSevenSeg q7seg(seg,dp,an0,an1,an2,an3,num0,num1,num2,num3,targetClk);
    
    
    ////////////////////////////////////////
    // LAB04_01 : RAM
        
    // Single Pulser
//    wire push,pop,reset;
//    singlePulser(push, btnU, targetClk); // push stack
//    singlePulser(pop, btnC, targetClk); // pop stack -> display top value in num3,num2 and stack size in num1,num0
//    singlePulser(reset, btnD, targetClk); // reset
    
//    wire [3:0] num3,num2,num1,num0; // left to right
//    SinglePortRAM stack({num1,num0},{num3,num2},sw[7:0],pop,targetClk,push,reset);
    
    
    ////////////////////////////////////////
    // LAB04_02: ROM and control
//    reg [3:0] num3,num2,num1,num0; // left to right
//    reg [7:0] rom[2**5-1:0];
//    initial $readmemb("rom2.mem", rom);
    
//    always @(posedge targetClk)
//        {num3,num2,num1,num0} = {8'b00000000, rom[sw[4:0]] };
    
    
    ////////////////////////////////////////
    // LAB04_03 ROM and control
    reg [3:0] num3,num2,num1,num0; // left to right
    reg [15:0] rom[2**10-1:0];
    initial $readmemb("rom4.mem", rom);
    
    reg [1:0] mode;
    
    always @(posedge targetClk && (btnU || btnL || btnD || btnR)) begin
        case({btnU, btnL, btnD, btnR})
            4'b1000: mode = 0; //plus
            4'b0100: mode = 1; //subtract
            4'b0010: mode = 2; //multiply
            4'b0001: mode = 3; //divide
        endcase
        {num3,num2, num1, num0} = rom[{mode,sw[7:0]}];
    end

endmodule