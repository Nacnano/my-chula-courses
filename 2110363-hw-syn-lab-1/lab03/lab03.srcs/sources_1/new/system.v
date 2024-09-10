`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date: 09/10/2024 10:19:30 AM
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
        input btnU, //set9
        input btnC, //set0
        input clk
    );
    
    wire [3:0] num0, num1, num2, num3;
    
    wire an0, an1, an2, an3;
    assign an = {an3, an2, an1, an0};
    
    
    // CLOCK
    wire targetClk;
    wire [18:0] tClk;
    
    assign tClk[0] = clk;
    
    genvar c;
    generate for(c=0;c<18;c=c+1) begin 
        clockDiv fDiv(tClk[c+1], tClk[c]);
        end
    endgenerate
    
    clockDiv fDivTarget (targetClk, tClk[18]);
   
    
    // DEBOUNCE
    wire [7:0] d, notd, d2, notd2;
    genvar n;
    generate for(n=0;n<8;n=n+1) begin 
    dFlipFlop dFF2(d2[n], notd2[n], sw[n], targetClk);
    dFlipFlop dFF1(d[n], notd[n], d2[n], targetClk);
    end
    endgenerate
    
    // SINGLE PULSER
    wire up0, up1, up2, up3, down0, down1, down2, down3;
    singlePulser spUP3(up3, d[7], targetClk);
    singlePulser spUP2(up2, d[5], targetClk);
    singlePulser spUP1(up1, d[3], targetClk);
    singlePulser spUP0(up0, d[1], targetClk);
    singlePulser spDOWN3(down3, d[6], targetClk);
    singlePulser spDOWN2(down2, d[4], targetClk);
    singlePulser spDOWN1(down1, d[2], targetClk);
    singlePulser spDOWN0(down0, d[0], targetClk);
    
    // COUNTER
    wire cout0, cout1, cout2, cout3;
    wire bout0, bout1, bout2, bout3;
    
    BCDCounter counter0(num0, cout0, bout0, btnU|cout3, btnC|bout3, up0, down0, targetClk);
    BCDCounter counter1(num1, cout1, bout1, btnU|cout3, btnC|bout3, up1|cout0, down1|bout0, targetClk);
    BCDCounter counter2(num2, cout2, bout2, btnU|cout3, btnC|bout3, up2|cout1, down2|bout1, targetClk);
    BCDCounter counter3(num3, cout3, bout3, btnU|cout3, btnC|bout3, up3|cout2, down3|bout2, targetClk);
    
    
    // DISPLAY
    quadSevenSeg(seg, dp, an0, an1, an2, an3, num0, num1, num2, num3, targetClk);
       
endmodule
