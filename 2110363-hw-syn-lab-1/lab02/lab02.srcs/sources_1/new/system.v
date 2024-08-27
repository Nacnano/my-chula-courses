`timescale 1ns / 1ps

module system(
    output [6:0] seg,
    output dp,
    output [3:0] an,
    input clk
    );
    

    ////////////////////////////////////////
    // Assign number
    wire [3:0] num3,num2,num1,num0; // From left to right
    
    assign num0=4;
    assign num1=3;
    assign num2=2;
    assign num3=1;

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
    
endmodule